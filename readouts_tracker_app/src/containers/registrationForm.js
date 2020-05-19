import React from 'react'


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    const { firstName, lastName, email, password, password_confirmation } = this.state;
    console.log(
      firstName,
      lastName,
      email,
      password,
      password_confirmation
    );
    
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Your first name"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Your last name"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default RegistrationForm