import { useState } from 'react';
import Router from 'next/router'
import useRequest from '../../hooks/use-request';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/auth/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password)
    Router.push('/')
    doRequest();
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Signin Page</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={p => setPassword(p.target.value)} type="password" className="form-control"/>
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
export default SignUp;