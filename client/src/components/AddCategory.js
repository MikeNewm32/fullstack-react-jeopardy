import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
const AddCategoryStyle = styled.div`text-align: center;`;

const QuestionInput = props => {
  const { question, answer, value } = props.question; 
  return (
    <div>
      <h3> {value} </h3>
      <label htmlFor={`${value}question`}>Question: </label>
      <input onChange={props.changeEvent} type="text" 
            value={question} name={`${value}question`}
            points={value} type="question"
      />
      <br />
      <label htmlFor={`${value}question`}>Answer: </label>
      <input onChange={props.changeEvent} type="text"
            value={answer} name={`${value}question`}
            points={value} type="answer"
      />
      <br />
    </div>
  );
};

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      category: {
        name: "",
        questions: [
          {
            value: 200,
            question: "",
            answer: ""
          },
          {
            value: 400,
            question: "",
            answer: ""
          },
          {
            value: 600,
            question: "",
            answer: ""
          },
          {
            value: 800,
            question: "",
            answer: ""
          },
          {
            value: 1000,
            question: "",
            answer: ""
          }
        ]
      }
    };
  }
  _changeCategory = e => {
    const newState = { ...this.state };
    newState.category.name = e.target.value;

    this.setState(newState);
  };
  _changeEvent = event => {
    const points = event.target.attributes.points.value;
    const type = event.target.attributes.type.value;

    const newState = { ...this.state };
    const questionChanged = newState.category.questions.find(question => {
      return question.value === parseInt(points);
    });

    if (type === "question") {
      questionChanged.question = event.target.value;
    } else {
      questionChanged.answer = event.target.value;
    }
    this.setState(newState);
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/category", this.state).then((res) => {
      console.log("Success!");
    })
    .catch(err => console.log(err));
  };


  render() {
    return (
      <AddCategoryStyle>
        <h1>Add A Category</h1>
        <form onSubmit={this._handleSubmit}>
          <div>
            <label htmlFor="name">Category Name: </label>
            <input
              onChange={this._changeCategory}
              value={this.state.category.name}
              type="text"
              name="name"
            />
          </div>
          {this.state.category.questions.map((question, i) => {
            return (
              <QuestionInput
                key={i}
                changeEvent={this._changeEvent}
                question={question}
              />
            );
          })}
        <button>Add Category</button>
        </form>
      </AddCategoryStyle>
    );
  }
}

export default AddCategory;