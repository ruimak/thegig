import React, { Component } from "react";
import { getSetLists, getBandInfo } from "../../api";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const styles = {

}

class SetLists extends Component {
  state = {
    setLists: null,
    // setListDisplayed: null
    songs : null,
    eventName : null
  };

  // openAndCloseSetlist = setListIndex => {
  //   !this.state.setListDisplayed
  //     ? this.setState({ setListDisplayed: setListIndex })
  //     : this.setState({ setListDisplayed: null });
  // };

  backTosetLists = back => {
    this.setState({songs:back})
  }

  handleClick(e,setlist) {
const setlists = setlist.map((songs,i) => {
  return songs.song.map(playlist => {
return playlist
  })
})
this.setState({songs : setlists,
eventName:e.target.id})
  }

  componentDidMount() {
    getBandInfo(this.props.params.band).then(bandinfo => {
      getSetLists(bandinfo.data.artist.mbid).then(setLists => {
        this.setState({ setLists: setLists.data.setlist });
      });
    });
  }
  
  render()
  
  {  
    console.log(this.state.setLists,'uigiuyfuyfuyf') 
this.set = this.state.setLists === null ? 'There is no setlist for this artist' : this.state.setLists.map((setlist,i) => {
  
  return   setlist.sets.set.length === 0 ? null : <div onClick={(e) => this.handleClick(e,setlist.sets.set)}
   id={setlist.venue.name} >{setlist.venue.name}</div>

  })
    return (
<div>
<div onClick={() => this.backTosetLists(null)}>{this.state.songs !== null ? this.state.eventName : null}</div>
  {this.state.songs === null ? this.set : 
  this.state.songs.map(song => {
    return song.map(songs => {
      return (
        <Link to={`/artist/${this.props.params.band}/song/${songs.name}`}>{songs.name}<br/></Link>
     )
    })
  })}
</div>
    
    // if (!this.state.setLists) {
    //   return "There are no setlists for this artist.";
    // }
    // //the songs are rendered here if you click on a setlist
    // else if (this.state.setListDisplayed) {
    //   return (
    //     <div>
    //       <div
    //         onClick={() => {
    //           this.openAndCloseSetlist(null);
    //         }}
    //       >
    //         {this.state.setLists[this.state.setListDisplayed].venue.name}
    //       </div>
    //       {this.state.setLists[this.state.setListDisplayed].sets.set[0] &&
    //         this.state.setLists[
    //           this.state.setListDisplayed
    //         ].sets.set[0].song.map(song => {
    //           return <Link to={`/artist/${this.props.params.band}/song/${song.name}`}>{song.name}<br/></Link>;
    //         })}
    //     </div>
    //   );
    // }
    // //this is the list of setlists, pardon the redundancy
    // else
    //   return (
    //     <div>
    //       <div>
    //         {this.state.setLists.map((setList, index) => {
    //           return (
    //             <div
    //               onClick={() => {
    //                 this.openAndCloseSetlist(index);
    //               }}
    //             >
    //               {setList.venue.name}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
      );
    }
}
export default withStyles(styles)(SetLists)