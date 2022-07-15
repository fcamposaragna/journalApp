import { Button, Grid, TextField, Typography } from "@mui/material"
import { SaveOutlined } from '@mui/icons-material';
import { ImageGallery } from "../components";

export const NoteView = () => {
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}       className="animate__animated animate__fadeIn animate__faster" >

        <Grid item>
            <Typography fontSize={39} fontWeight='ligth'>28 de agosto, 2023</Typography>

        </Grid>

        <Grid item>
            <Button color='primary' sx={{padding: 2}}>
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder="Create a title"
                label='Title'
                sx={{border:'none', mb: 1}}
            />
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder="What's happend today?"
                minRows={5}
            />
        </Grid>

        <ImageGallery />


    </Grid>
  )
}
