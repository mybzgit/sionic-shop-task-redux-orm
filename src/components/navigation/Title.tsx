import React from 'react';
import classes from './Title.module.css';

type TitleProps = {
  text: string;
};

const Title: React.FC<TitleProps> = (props: TitleProps) => {
  return <span className={classes.title}>{props.text}</span>;
};

export default Title;
