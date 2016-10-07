import React, { Component } from 'react';
import style from './style';

export default class CommentForm extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = { text: '' };
    // bind functions so it can be passed later
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit() {
    const { user, addComment } = this.props;
    const text = this.state.text.trim();
    if (!user.id || !text || text === '') {
      return;
    }
    const time = Date.now();
    addComment({ text, time, userId: user.id });
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <div style={style.wrapper}>
        <input
          style={style.input}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="Your comment..."
          value={text}
        />
        <button
          style={style.submitButton}
          onClick={this.onSubmit}
        >Submit
        </button>
      </div>
    );
  }
}
