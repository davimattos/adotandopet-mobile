import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import FloatLabelInput from '~/components/FloatLabelInput';
import NativeButton from '~/components/NativeButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';

import logo from '~/assets/images/signin_logo.png';

import {
  Container,
  ContentContainer,
  Logo,
  ForgotPasswordLink,
  ForgotPasswordText,
  TermsLink,
  TermsLinkText,
  SignupLinkContainer,
  SignupLinkContent,
  SignupLinkText,
} from './styles';

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    signinRequest: PropTypes.func.isRequired,
  };

  state = {
    email: 'a@b.com',
    password: '123123',
    loading: false,
    error: '',
  };

  handleInputChange = (id, value) => {
    this.setState({ [id]: value });
  };

  handleSignIn = () => {
    const { loading, email, password } = this.state;

    if (loading) return;

    if (!email || !password) {
      this.setState({ error: 'Por favor, preencha todos os campos para continuar!' });
    }

    const { signinRequest } = this.props;

    signinRequest({ email, password });
  };

  setLastInputRef = ref => (this.passwordInput = ref);

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ContentContainer>
          <Logo source={logo} />
          <FloatLabelInput
            id="email"
            label="Email"
            value={email}
            onChangeText={this.handleInputChange}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            keyboardType="email-address"
          />
          <FloatLabelInput
            id="password"
            setRef={this.setLastInputRef}
            label="Senha"
            value={password}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleSignIn}
            secureTextEntry
          />
          <ForgotPasswordLink onPress={() => this.handleNavigate('ForgotPassword')}>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
          </ForgotPasswordLink>
          <NativeButton onPress={this.handleSignIn} value="Entrar" />
          <SignupLinkContainer onPress={() => this.handleNavigate('SignUp')}>
            <SignupLinkContent>
              <SignupLinkText>Ainda não tem conta?</SignupLinkText>
              <SignupLinkText featured>Cadastre-se!</SignupLinkText>
            </SignupLinkContent>
          </SignupLinkContainer>
        </ContentContainer>
        <TermsLink onPress={() => this.handleNavigate('Privacy')}>
          <TermsLinkText>Privacidade & Termos de Uso</TermsLinkText>
        </TermsLink>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
