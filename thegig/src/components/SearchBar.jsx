import React from "react";
import { getBandInfo, getBandSuggestions, getSongSuggestions } from "../api";
import { withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";

// these are for the styles


import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";


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


const styles = theme => ({
  // https://github.com/moroshko/react-autosuggest - at the bottom there are some guidelines to properly style the searchbar
  root: {
    height: 50,
    flexGrow: 1,
    width: theme.spacing.unit * 40
    // width:'80%'
  },
  input: {
    backgroundColor: "#FFFFFF",
    // width:'80%'
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
  //IF YOU WANT TO SEARCH WITHOUT ACCENT IN WORDS REPLACE WITH THE FOLLOWING
  // const inputValue = deburr(value.trim()).toLowerCase();
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return getBandSuggestions(value).then(result => {
    const bands = result;
    return getSongSuggestions(value).then(songsResult => {
      let songs = songsResult;
      return inputLength === 0
        ? []
        : [
            {
              title: "Bands",
              suggestions: bands.data.results.artistmatches.artist.slice(0, 4)
            },
            {
              title: "Songs",
              suggestions: songs.data.results.trackmatches.track.slice(0, 4)
            }
          ];
      //  add this part to filter exact matches rather than relevant ones
      // .filter(
      //   artist =>
      //     artist.name.toLowerCase().slice(0, inputLength) === inputValue
      // )
    });
  });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
  return suggestion.name;
};

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
        // popper: ""
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
   
      ) => {
        if (!suggestionValue) {
          getBandInfo(suggestion).then(bandInfo => {
            this.setState({ value: "" });
            this.props.history.push(
              `/artist/${bandInfo.data.artist.name}/news`
            );
          });
        } else if (suggestionValue && suggestionValue.method === "click") {
          suggestionValue.sectionIndex === 0
            ? this.props.history.push(
                `/artist/${suggestionValue.suggestion.name}/news/`
              )
            : this.props.history.push(
                `/artist/${suggestionValue.suggestion.artist}/song/${
                  suggestionValue.suggestion.name
                }`
              );
          this.setState({ value: "" });
        } else {
          suggestionValue.sectionIndex === 0
            ? this.props.history.push(
                `/artist/${suggestionValue.suggestion.name}/news/`
              )
            : this.props.history.push(
                `/artist/${suggestionValue.suggestion.artist}/song/${
                  suggestionValue.suggestion.name
                }`
              );
          this.setState({ value: "" });
        }
      };

      // Enable onKeyDown in order to be able to go to a band page without using suggestions

      // onKeyDown(event) {
      //   if (event.key === "Enter") {
      //     this.onSuggestionSelected(this.state.value);
      //   }
      // }

      renderSectionTitle(section) {
        return <strong>{`- - ${section.title} - - `}</strong>;
      }
      getSectionSuggestions(section) {
        return section.suggestions;
      }

      renderSuggestion(suggestion) {
        return suggestion.artist ? (
          <div data-cy="searchbar">
            <span>{suggestion.name}</span>
            <span style={{ fontSize: "70%", fontStyle: "italic" }}>{` by ${
              suggestion.artist
            }`}</span>
          </div>
        ) : (
          <span>{suggestion.name}</span>
        );
      }

      render() {
        const { classes } = this.props;

        const autosuggestProps = {
          renderInputComponent,
          suggestions: this.state.suggestions,
          onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          getSuggestionValue,
          renderSuggestion: this.renderSuggestion,
          onSuggestionSelected: this.onSuggestionSelected,
          multiSection: true,
          renderSectionTitle: this.renderSectionTitle,
          getSectionSuggestions: this.getSectionSuggestions
        };

      

        // Autosuggest will pass through all these props to the input.

        
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
                onChange: this.handleChange("value")
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
