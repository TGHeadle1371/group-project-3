import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import GoogleSearch from "../components/GoogleSearch";


class Main extends Component {
    state = {
        books: [],
        title: "",
        author: ""
    };


   

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res =>
                this.setState({ books: res.data, title: "", author: "" })
            )
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };
    findById = id => {
        API.findById(id)
            .then(res =>
                this.loadBooks({ books: res.data, title: "", author: "" })
            )
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title) {
            API.findByTitle({
                title: this.state.title
            })
                .then(res => this.setState({ books: res.data, title: "" }))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="lg-12">
                        <Jumbotron>
                            <h1> SEARCH FOR A CHEAT SHEET BELOW!</h1>
                        </Jumbotron>
                        {/* <Input
                            name="title"
                            type="text"
                            placeholder="Type a language here"
                            defaultValue={this.state.title}
                            onChange={this.handleInputChange}
                        />
                        <FormBtn
                            disabled={!this.state.title}
                            onClick={this.handleFormSubmit}
                        />
                        <br>
                        </br> */}
                        <GoogleSearch
                        />
                        <br />
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <Link to={"/books/" + book._id}>
                                            <strong>{book.title}</strong>
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Main;