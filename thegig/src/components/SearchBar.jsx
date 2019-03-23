import React, { Component } from "react";
import { getBandInfo, getBandSuggestions } from "../api";
import { withRouter, Redirect } from "react-router-dom";
import Autosuggest from "react-autosuggest";

// these are for the styles

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import deburr from "lodash/deburr";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";



// const styles = theme => ({
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.45),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.55)
//     },
//     marginRight: theme.spacing.unit * 2,
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing.unit * 3,
//       width: "auto"
//     }
//   },
//   searchIcon: {
//     width: theme.spacing.unit * 9,
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   inputRoot: {
//     color: "inherit",
//     width: "100%"
//   },
//   inputInput: {
//     paddingTop: theme.spacing.unit,
//     paddingRight: theme.spacing.unit,
//     paddingBottom: theme.spacing.unit,
//     paddingLeft: theme.spacing.unit * 10,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: 200
//     }
//   }
// });

//THIS IS THE NEW IMPLEMENTATION OF AUTOSUGGEST

// Teach Autosuggest how to calculate suggestions for any given input value.

//STYLING
function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
}

const styles = theme => ({
  // https://github.com/moroshko/react-autosuggest - at the bottom there are some guidelines to style the searchbar
  root: {
    height: 50,
    flexGrow: 1,
    width: theme.spacing.unit *40 ,
   
  },
  input:{
    backgroundColor:'#FFFFFF',
    width: theme.spacing.unit *40 ,

  },
  container: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: '50%',
    width:'100%',
    position: "relative",
    
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0

  },
  suggestion: {
    display: "block",

  },
  // suggestionContainer:{
  //   color: 'green'
  // },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2,
    
  }
});

const getSuggestions = value => {
  console.log(value, "VALUEEEEEEEEEEEE");
  //IF YOU WANT TO SEARCH WITHOUT ACCENT IN WORDS REPLACE WITH THE FOLLOWING
  // const inputValue = deburr(value.trim()).toLowerCase();
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return getBandSuggestions(value).then(result => {

    return inputLength === 0
      ? []
      : result.data.results.artistmatches.artist
        //  add this part to filter exact matches rather than relevant ones
          // .filter(
          //   artist =>
          //     artist.name.toLowerCase().slice(0, inputLength) === inputValue
          // )
          .slice(0, 5);
  });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
// const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

export default withStyles(styles)(
  withRouter(
    class SearchBar extends React.Component {
      // Autosuggest is a controlled component.
      // This means that you need to provide an input value
      // and an onChange handler that updates this value (see below).
      // Suggestions also need to be provided to the Autosuggest,
      // and they are initially empty because the Autosuggest is closed.
      state = {
        value: "",
        suggestions: [],
        popper: ""
      };

      handleChange = name => (event, { newValue }) => {
        this.setState({
          [name]: newValue
        });
      };

      // Autosuggest will call this function every time you need to update suggestions.
      // You already implemented this logic above, so just use it.
      onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value).then(result => {
          this.setState({
            suggestions: result
          });
        });
      };

      // Autosuggest will call this function every time you need to clear suggestions.
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

      onSuggestionSelected = (
        suggestion,
        suggestionValue,
        suggestionIndex,
        sectionIndex,
        method
      ) => {
        if (!suggestionValue) {
          getBandInfo(suggestion).then(bandInfo => {
            console.log(bandInfo.data.artist.name, "NAME OF THE ARTIST");
            this.props.getBandInformation(bandInfo.data.artist);
            this.setState({ value: "" });
            this.props.history.push(
              `/artist/${bandInfo.data.artist.name}/news/`
            );
          });
        } else if (suggestionValue && suggestionValue.method === "click") {
          getBandInfo(suggestionValue.suggestionValue).then(bandInfo => {
            this.props.getBandInformation(bandInfo.data.artist);
            this.props.history.push(
              `/artist/${suggestionValue.suggestionValue}/news/`
            );
            this.setState({ value: "" });
          });
        } else {
          getBandInfo(suggestionValue.suggestionValue).then(bandInfo => {
            this.props.getBandInformation(bandInfo.data.artist);
            this.props.history.push(`/artist/${this.state.value}/news/`);
            this.setState({ value: "" });
            console.log(this.state.value, "HELLO");
          });
        }
      };

      onKeyDown(event) {
        if (event.key === "Enter") {
          this.onSuggestionSelected(this.state.value);
        }
      }

      render() {
        const { classes } = this.props;

        const autosuggestProps = {
          renderInputComponent,
          suggestions: this.state.suggestions,
          onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          getSuggestionValue,
          renderSuggestion,
          onSuggestionSelected: this.onSuggestionSelected
        };

        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.


        // Finally, render it!
        return (
          <div className={classes.root} styles={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Autosuggest
              {...autosuggestProps}
              inputProps={{
                classes,
                placeholder: "Search for an artist...",
                value: this.state.value,
                onChange: this.handleChange("value"),
                onKeyDown: this.onKeyDown.bind(this)
              }}
              theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion
              }}
              renderSuggestionsContainer={options => (
                <Paper {...options.containerProps} square>
                  {options.children}
                </Paper>
              )}
           
            />
            <div className={classes.divider} />
            {/* <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        label: 'Label',
        placeholder: 'With Popper',
        value: this.state.popper,
        onChange: this.handleChange('popper'),
        inputRef: node => {
          this.popperNode = node;
        },
        InputLabelProps: {
          shrink: true,
        },
      }}
      theme={{
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderSuggestionsContainer={options => (
        <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
          <Paper
            square
            {...options.containerProps}
            style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
          >
            {options.children}
          </Paper>
        </Popper>
      )} */}
            {/* /> */}
          </div>
        );
      }
    }
  )
);

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.

// export default withRouter(
//   withStyles(styles)(
//     class SearchBar extends Component {
//       state = {
//         input: "",
//         suggestions: []
//         //   band : null
//       };

//       handleSubmit = e => {
//         e && e.preventDefault();
//         getBandInfo(this.state.suggestions[0]).then(bandInfo => {
//           this.props.getBandInformation(bandInfo.data.artist);
//           this.props.history.push(`/artist/${this.state.input}/news/`);
//         });
//       };

//       handleChange = e => {
//         const text = e.target.value;
//         this.setState({ input: text });
//         text.length !== 0
//           ? getBandSuggestions(text).then(result => {
//               const parsedSuggestions = result.data.results.artistmatches.artist
//                 .slice(0, 5)
//                 .map(entry => entry.name);

//               this.setState({
//                 suggestions: parsedSuggestions
//               });

//               return result;
//             })
//           : this.setState({
//               input: text,
//               suggestions: []
//             });
//       };
//       suggestionSelected = value => {
//         this.setState({
//           input: value,
//           suggestions: []
//         });
//         this.handleSubmit();
//       };

//       renderSuggestions = () => {
//         const suggestions = this.state.suggestions;
//         if (suggestions.length === 0 || this.state.input === 0) {
//           return null;
//         }
//         return (
//           <ul>
//             {suggestions.map(suggestion => (
//               <li
//                 onClick={() => {
//                   this.suggestionSelected(suggestion);
//                 }}
//               >
//                 {suggestion}
//               </li>
//             ))}
//           </ul>
//         );
//       };

//       render() {
//         console.log(getSuggestions('the b'), 'this is the console log you are looking for')
//         const { input } = this.state;
//         const { classes } = this.props;
//         return (
//           <div>
//             <form onSubmit={this.handleSubmit} className={classes.search}>
//               <div className={classes.searchIcon}>
//                 <SearchIcon />
//               </div>
//               <InputBase
//                 placeholder="Search…"
//                 classes={{
//                   root: classes.inputRoot,
//                   input: classes.inputInput
//                 }}
//                 onChange={this.handleChange}
//               />
//               <div className={classes.grow} />
//               {/* <input
//               placeholder="Search for an artist..."
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//                 className={classes.search}
//                 value={this.state.input}
//                 name="name"
//                 onChange={this.handleChange} */}

//               {this.renderSuggestions()}
//               {/* <input type="submit" value="Submit" /> */}
//             </form>
//           </div>
//         );
//       }
//     }
//   )
// );
