import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(1111111)
  console.log(currentUser)
  console.log(1111111)
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// LandingPage.getInitialProps = async context => {
//   console.log('LANDING PAGE!');
//   const client = await buildClient(context);

//   const { data } = await client.get('/auth/signup');

//   return data;
// };

export default LandingPage;