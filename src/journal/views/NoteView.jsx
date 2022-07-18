import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, TextField, Typography } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote, startSaveNote } from '../../store/journal';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state=>state.journal);
    const { body, title, onInputChange, formState, date } = useForm(note);

    const dateString = useMemo(()=>{
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const onSaveNote = ()=>{
        dispatch(startSaveNote());
    }

    useEffect(() => {
      dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
      if(messageSaved.length>0){
        Swal.fire('Nota actualizada', messageSaved, 'success')
      }
    }, [messageSaved])
    
    

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}       className="animate__animated animate__fadeIn animate__faster" >

        <Grid item>
            <Typography fontSize={39} fontWeight='ligth'>{ dateString }</Typography>

        </Grid>

        <Grid item>
            <Button 
                disabled={isSaving}
                color='primary'
                sx={{padding: 2}}
                onClick={onSaveNote}
            >
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder="Ingresa un título para tu nota"
                label='Titulo'
                sx={{border:'none', mb: 1}}
                name='title'
                value={ title }
                onChange={ onInputChange }
            />
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder="What's happend today?"
                minRows={5}
                name='body'
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <ImageGallery />


    </Grid>
  )
}
