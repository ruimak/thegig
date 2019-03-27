import React, { Component } from "react";
import { getBandInfo, getBandSuggestions, getSongSuggestions } from "../api";
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
    width: theme.spacing.unit * 40
  },
  input: {
    backgroundColor: "#FFFFFF",
    width: theme.spacing.unit * 40
  },
  container: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: "50%",
    width: "100%",
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
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
    height: theme.spacing.unit * 2
  }
});

const getSuggestions = value => {
  console.log(value, "VALUEEEEEEEEEEEE");
  //IF YOU WANT TO SEARCH WITHOUT ACCENT IN WORDS REPLACE WITH THE FOLLOWING
  // const inputValue = deburr(value.trim()).toLowerCase();
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return getBandSuggestions(value).then(result => {
    const bands = result;
    return getSongSuggestions(value).then(songsResult => {
      let songs = songsResult;
console.log(songs, 'SONGSSSSSSSSSSSSSSSSSSSSss')
      return inputLength === 0
        ? []
        : [{title:'Bands', suggestions:bands.data.results.artistmatches.artist.slice(0, 4)}, {title:'Songs', suggestions:songs.data.results.trackmatches.track.slice(0, 4)}]
            //  add this part to filter exact matches rather than relevant ones
            // .filter(
            //   artist =>
            //     artist.name.toLowerCase().slice(0, inputLength) === inputValue
            // )
            ;
    });
  });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => 
{console.log(suggestion.name, 'SUGGESTION CONSOLEEEEEEEEEEEEEEEEEEEEE')
  
  return suggestion.name;}


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
          console.log(result, 'THIS IS THE RESULTING ARRAY')
          this.setState({
            suggestions: result
          });
          console.log(this.state.suggestions, "SUGGESTIOS UPDATED IN STATE");
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
      ) => {            console.log(sectionIndex, 'SECTION')
      console.log(suggestion, 'THIS IS THE SUGGESTION')
      console.log(suggestionValue, 'THIS IS THE SUGGESTION VALUEEE')

        if (!suggestionValue) {
          getBandInfo(suggestion).then(bandInfo => {
            console.log(bandInfo.data.artist.name, "NAME OF THE ARTIST");
            this.props.getBandInformation(bandInfo.data.artist);
            this.setState({ value: "" });
            this.props.history.push(
              `/artist/${bandInfo.data.artist.name}/news`
            );
          });
        } else 
        if (suggestionValue && suggestionValue.method === "click") {
            suggestionValue.sectionIndex===0 ? this.props.history.push(
              `/artist/${suggestionValue.suggestion.name}/news/`
            ) : this.props.history.push(
              `/artist/${suggestionValue.suggestion.artist}/song/${suggestionValue.suggestion.name}`
            )
            this.setState({ value: "" });
      
        } else {
          suggestionValue.sectionIndex===0 ? this.props.history.push(
            `/artist/${suggestionValue.suggestion.name}/news/`
          ) : this.props.history.push(
            `/artist/${suggestionValue.suggestion.artist}/song/${suggestionValue.suggestion.name}`
          )
          this.setState({ value: "" });
    
        }
      };


      // HAVE TO ENABLE ON KEY DOWN IN ORDER TO FETCH BANDS THAT ARENT SUGGESTED


      // onKeyDown(event) {
      //   if (event.key === "Enter") {
      //     this.onSuggestionSelected(this.state.value);
      //   }
      // }

      renderSectionTitle(section) {
        return (
          <strong>{`- - ${section.title} - - `}</strong>
        );
      }
      getSectionSuggestions(section) {
        return section.suggestions;
      }

      renderSuggestion(suggestion) {
        console.log(suggestion, 'THIS IS THE SUGGESTION TO BE RENDERED!!!!!!!!!!!!!!!!!!!!!')
        return  suggestion.artist ? <div><span>{suggestion.name}</span><span style={{fontSize:'70%', fontStyle: 'italic'}}>{` by ${suggestion.artist}`}</span></div> : <span>{suggestion.name}</span>
        
      }
     
      render() {
        const { classes } = this.props;

        const autosuggestProps = {
          renderInputComponent,
          suggestions: this.state.suggestions,
          onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          getSuggestionValue,
          renderSuggestion:this.renderSuggestion,
          onSuggestionSelected: this.onSuggestionSelected,
            multiSection:true,
            renderSectionTitle:this.renderSectionTitle,
          getSectionSuggestions:this.getSectionSuggestions,
        
        };

        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.

        console.log(this.state.suggestions, "SUGESTIONS");
        // Finally, render it!
        return (
          <div
            className={classes.root}
            styles={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Autosuggest
              {...autosuggestProps}
              inputProps={{
                classes,
                placeholder: "Search for an artist...",
                value: this.state.value,
                onChange: this.handleChange("value"),
                // onKeyDown: this.onKeyDown.bind(this)
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
          </div>
        );
      }
    }
  )
);










///////////




// //THIS IS THE NEW IMPLEMENTATION OF AUTOSUGGEST

// // Teach Autosuggest how to calculate suggestions for any given input value.

// //STYLING
// function renderInputComponent(inputProps) {
//   const { classes, inputRef = () => {}, ref, ...other } = inputProps;

//   return (
//     <TextField
//       fullWidth
//       InputProps={{
//         inputRef: node => {
//           ref(node);
//           inputRef(node);
//         },
//         classes: {
//           input: classes.input
//         }
//       }}
//       {...other}
//     />
//   );
// }
// function renderSuggestion(suggestion, { query, isHighlighted }) {
//   const matches = match(suggestion.name, query);
//   const parts = parse(suggestion.name, matches);

//   return (
//     <MenuItem selected={isHighlighted} component="div">
//       <div>
//         {parts.map((part, index) =>
//           part.highlight ? (
//             <span key={String(index)} style={{ fontWeight: 500 }}>
//               {part.text}
//             </span>
//           ) : (
//             <strong key={String(index)} style={{ fontWeight: 300 }}>
//               {part.text}
//             </strong>
//           )
//         )}
//       </div>
//     </MenuItem>
//   );
// }

// const styles = theme => ({
//   // https://github.com/moroshko/react-autosuggest - at the bottom there are some guidelines to style the searchbar
//   root: {
//     height: 50,
//     flexGrow: 1,
//     width: theme.spacing.unit * 40
//   },
//   input: {
//     backgroundColor: "#FFFFFF",
//     width: theme.spacing.unit * 40
//   },
//   container: {
//     marginTop: theme.spacing.unit * 2,
//     marginLeft: "50%",
//     width: "100%",
//     position: "relative"
//   },
//   suggestionsContainerOpen: {
//     position: "absolute",
//     zIndex: 1,
//     marginTop: theme.spacing.unit,
//     left: 0,
//     right: 0
//   },
//   suggestion: {
//     display: "block"
//   },
//   // suggestionContainer:{
//   //   color: 'green'
//   // },
//   suggestionsList: {
//     margin: 0,
//     padding: 0,
//     listStyleType: "none"
//   },
//   divider: {
//     height: theme.spacing.unit * 2
//   }
// });

// const getSuggestions = value => {
//   console.log(value, "VALUEEEEEEEEEEEE");
//   //IF YOU WANT TO SEARCH WITHOUT ACCENT IN WORDS REPLACE WITH THE FOLLOWING
//   // const inputValue = deburr(value.trim()).toLowerCase();
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//   return getBandSuggestions(value).then(result => {

//     return inputLength === 0
//       ? []
//       : result.data.results.artistmatches.artist
//           //  add this part to filter exact matches rather than relevant ones
//           // .filter(
//           //   artist =>
//           //     artist.name.toLowerCase().slice(0, inputLength) === inputValue
//           // )
//           .slice(0, 5);
//   });
// };

// // When suggestion is clicked, Autosuggest needs to populate the input
// // based on the clicked suggestion. Teach Autosuggest how to calculate the
// // input value for every given suggestion.
// const getSuggestionValue = suggestion => suggestion.name;

// // Use your imagination to render suggestions.
// // const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

// export default withStyles(styles)(
//   withRouter(
//     class SearchBar extends React.Component {
//       // Autosuggest is a controlled component.
//       // This means that you need to provide an input value
//       // and an onChange handler that updates this value (see below).
//       // Suggestions also need to be provided to the Autosuggest,
//       // and they are initially empty because the Autosuggest is closed.
//       state = {
//         value: "",
//         suggestions: [],
//         popper: ""
//       };

//       handleChange = name => (event, { newValue }) => {
//         this.setState({
//           [name]: newValue
//         });
//       };

//       // Autosuggest will call this function every time you need to update suggestions.
//       // You already implemented this logic above, so just use it.
//       onSuggestionsFetchRequested = ({ value }) => {
//         getSuggestions(value).then(result => {
//           this.setState({
//             suggestions: result
//           });
//           console.log(this.state.suggestions, 'SUGGESTIOS UPDATED IN STATE')
//         });
//       };

//       // Autosuggest will call this function every time you need to clear suggestions.
//       onSuggestionsClearRequested = () => {
//         this.setState({
//           suggestions: []
//         });
//       };

//       onSuggestionSelected = (
//         suggestion,
//         suggestionValue,
//         suggestionIndex,
//         sectionIndex,
//         method
//       ) => {
//         if (!suggestionValue) {
//           getBandInfo(suggestion).then(bandInfo => {
//             console.log(bandInfo.data.artist.name, "NAME OF THE ARTIST");
//             this.props.getBandInformation(bandInfo.data.artist);
//             this.setState({ value: "" });
//             this.props.history.push(
//               `/artist/${bandInfo.data.artist.name}/news/`
//             );
//           });
//         } else if (suggestionValue && suggestionValue.method === "click") {
//           getBandInfo(suggestionValue.suggestionValue).then(bandInfo => {
//             this.props.getBandInformation(bandInfo.data.artist);
//             this.props.history.push(
//               `/artist/${suggestionValue.suggestionValue}/news/`
//             );
//             this.setState({ value: "" });
//           });
//         } else {
//           getBandInfo(suggestionValue.suggestionValue).then(bandInfo => {
//             this.props.getBandInformation(bandInfo.data.artist);
//             this.props.history.push(`/artist/${this.state.value}/news/`);
//             this.setState({ value: "" });
//             console.log(this.state.value, "HELLO");
//           });
//         }
//       };

//       onKeyDown(event) {
//         if (event.key === "Enter") {
//           this.onSuggestionSelected(this.state.value);
//         }
//       }

//       // renderSectionTitle(section) {
//       //   return (
//       //     <strong>{section.name}</strong>
//       //   );
//       // }
//       // getSectionSuggestions(section) {
//       //   return section.;
//       // }

//       render() {
//         const { classes } = this.props;

//         const autosuggestProps = {
//           renderInputComponent,
//           suggestions: this.state.suggestions,
//           onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
//           onSuggestionsClearRequested: this.onSuggestionsClearRequested,
//           getSuggestionValue,
//           renderSuggestion,
//           onSuggestionSelected: this.onSuggestionSelected,
//         //   multiSection:true,
//         //   renderSectionTitle:this.renderSectionTitle,
//         // getSectionSuggestions:this.SectionSuggestions
//         };

//         const { value, suggestions } = this.state;

//         // Autosuggest will pass through all these props to the input.

//         console.log(this.state.suggestions, "SUGESTIONS");
//         // Finally, render it!
//         return (
//           <div
//             className={classes.root}
//             styles={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//           >
//             <Autosuggest
//               {...autosuggestProps}
//               inputProps={{
//                 classes,
//                 placeholder: "Search for an artist...",
//                 value: this.state.value,
//                 onChange: this.handleChange("value"),
//                 onKeyDown: this.onKeyDown.bind(this)
//               }}
//               theme={{
//                 container: classes.container,
//                 suggestionsContainerOpen: classes.suggestionsContainerOpen,
//                 suggestionsList: classes.suggestionsList,
//                 suggestion: classes.suggestion
//               }}
//               renderSuggestionsContainer={options => (
//                 <Paper {...options.containerProps} square>
//                   {options.children}
//                 </Paper>
//               )}
//             />
//             <div className={classes.divider} />

//           </div>
//         );
//       }
//     }
//   )
// );
