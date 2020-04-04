import React from 'react';
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';

import Layout from '../components/layout/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { Input } from '../components/form/input';

const IndexPage = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <Layout>
      <SEO title="Request help" />
      <h1>Hi</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Input name="example" defaultValue="test" register={register} />

        {/* include validation with required or other standard HTML validation rules */}
        <input name="exampleRequired" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </Layout>
  );
};

export default IndexPage;
