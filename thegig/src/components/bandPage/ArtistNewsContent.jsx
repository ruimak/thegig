import React, { Component } from "react";
import { getArtistNews } from "../../api";

//this component needs an URL like http://www.mtv.com/news/3116199/taylor-swift-stalker-break-in-again/

export default class ArtistNewContent extends Component {
  state = {
    article: {}
  };
  componentDidMount() {
    getArtistNews(this.props.params.band).then(artistNews => {
      const clickedArticle = artistNews.data.articles.filter(article => {
        return article.title === this.props.params.newsTitle;
      });
      this.setState({ article: clickedArticle[0] });
      console.log(clickedArticle[0], "this state has been set");
    });
    // this.setState({
    //     article:chossenArticle
    //   })
    // console.log(chossenArticle,'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP')
  }
  render() {
    console.log(this.state, "@@@@@@@@@@@@@@@@@@@@@@@@@@");
    return (
    
    <div>
    
    <h1>{this.state.article.title}</h1>

    <p>{this.state.article.content}</p>
    
    
    </div>
    )
  }
}
