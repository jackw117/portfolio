import React from 'react';

class Item extends React.Component {
  render() {
    return (
      <tr>
        <td style={{"--size": (this.props.num / 100)}}>{this.props.num}</td>
      </tr>
    );
  }
}

class Project extends React.Component {
  render() {
    const li = this.props.listItems;
    const listItems = li.map((item) =>
      <li key={item}>{item}</li>
    );
    var url;
    if (this.props.href != null) {
      url = <a href={this.props.href}><i className="fa fa-lg fa-github"></i>source code</a>
    } else {
      url = <p>source code unavailable</p>
    }

    return (
      <div className="row">
        <div className="container wow" data-wow-duration="2s">
          <div className="col-xs-12 col-sm-12 col-md-6 desc vcenter">
            <h1>{this.props.title}</h1>
            <h2>{this.props.date}</h2>
            <p>{this.props.desc}</p>
            <ul className="tags">
              {listItems}
            </ul>
            {url}
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 imgDiv vcenter">
            <img src={this.props.image} alt={this.props.alt}/>
          </div>
        </div>
      </div>
    )
  }
}

class Skill extends React.Component {
  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-4">
        <img src={this.props.image} alt={this.props.alt}></img>
        <span>{this.props.name}</span>
      </div>
    );
  }
}

export {Item, Project, Skill};
