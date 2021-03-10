import React, { useState } from 'react';
import * as Yup from 'yup';

import { TextField, Button, Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import './styles.css';

export default function Home() {
  const [erros, setErros] = useState({});
  const [fields, setFields] = useState({});

  async function sendInformation(e) {
    e.preventDefault();

    const defaultSchema = Yup.object().shape({
      name: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Somente letras são validas')
        .required('O nome é obrigatorio'),
      phone: Yup.string()
        .matches(/[0-9]+/gi, 'Somente numeros')
        .required('O número é obrigatorio'),
      address: Yup.string().required('O Endereco é obrigatorio'),
      email: Yup.string()
        .email('Digite um email valido')
        .required('O email é obrigatorio'),
      date: Yup.date().required('A data é obrigatoria'),
    });

    try {
      await defaultSchema.validate(fields, {
        abortEarly: false,
      });
      setErros({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errYupMessages = {};
        err.inner.forEach((error) => {
          errYupMessages[error.path] = error.message;
        });
        setErros({ ...errYupMessages });
      }
    }
  }

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid className="form-box">
        <form className="form" onSubmit={sendInformation}>
          <Grid item sm={12}>
            <TextField
              label="nome"
              name="name"
              margin="normal"
              value={fields.name}
              error={erros && erros.name}
              helperText={erros && erros.name}
              fullWidth
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="numero"
              name="phone"
              margin="normal"
              value={fields.phone}
              error={erros && erros.phone}
              helperText={erros && erros.phone}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="endereco"
              name="address"
              margin="normal"
              value={fields.address}
              error={erros && erros.address}
              helperText={erros && erros.address}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="email"
              name="email"
              margin="normal"
              value={fields.email}
              error={erros && erros.email}
              helperText={erros && erros.email}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item sm={12} style={{ marginTop: '10px' }}>
            <TextField
              label="birthday"
              type="date"
              name="date"
              InputLabelProps={{ shrink: true }}
              error={erros && erros.date}
              helperText={erros && erros.date}
              value={fields.date}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid
            item
            sm={12}
            style={{
              marginTop: '20px',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Button variant="outlined" color="primary" type="submit">
              <CheckIcon style={{ marginRight: '5px' }} />
              ENVIAR
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
