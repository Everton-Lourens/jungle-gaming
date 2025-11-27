import express from 'express';

export const app = express();

function helloWorld(name: string) {
  console.log(name);
}
helloWorld("Everton Lourens!!");