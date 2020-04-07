import React from 'react';
import { navigate, Link } from 'epm-ui-boot/router';
import DefaultLayout from '../layouts/default';
import Great from '../components/great';
import testImg from '../../images/test.jpg';
import { Button } from 'epm-ui-react';

const About = ( props ) => (
    <DefaultLayout>

      <Great />
          <Link to="/about#a">a</Link>
          <Link to="/about#b">b</Link>
      <h2 id="a">About</h2>
      <h3 id="b">{ props.content.abc }</h3>
      <h3 id="c">{ props.content.def }</h3>
      <img src={ testImg } />
      <Button onClick={ () => navigate('/index') }>按钮</Button>
    </DefaultLayout>
);

export default About;