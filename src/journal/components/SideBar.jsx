import { TurnedInNot } from '@mui/icons-material';
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerwidth}) => {

    const { displayName } = useSelector(state=> state.auth);

  return (
    <Box
        component='nav'
        sx={{ width: {sm: drawerwidth}, flexShrink: {sm:0}}}
    >
        <Drawer
            variant='permanent'
            open={ true }
            sx= {{
                display: {xs:'block'},
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerwidth
                }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text=>(
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary= {text} />
                                    <ListItemText secondary = {'Est amet dolor aliquip sint .'} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
