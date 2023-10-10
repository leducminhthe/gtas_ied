import {
  Box,
  Grid,
  ButtonBase,
  Button,
} from '@mui/material';
import {
  Assessment as Report, Dialpad as QC,
} from '@mui/icons-material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { Store } from 'redux/store';
import { useAppSelector } from 'store/hooks';
import newLogo from 'assets/images/empty-box.png';
import { styled, useTheme } from '@mui/material/styles';
import useStyles from './style';
import TransitionCard from './TransitionCard';

const Home: React.FC = () => {
  const classes = useStyles();
  const [listChangeInfo, setListChangeInfo] = useState<number[]>([]);
  const {
    isAdmin,
  } = useAppSelector((state:any) => state.auth);

  const history = useHistory();
  console.log('render home', isAdmin);

  const handleRedirect = (access: boolean, path: string) => {
    if (access) {
      history.push(`/app/${path}`);
    }
  };

  const changeInfo = (id: number) => {
    const index = listChangeInfo.indexOf(id);
    if (index !== -1) {
      const newList = [...listChangeInfo];
      newList.splice(index, 1);
      setListChangeInfo(newList);
    } else {
      setListChangeInfo([...listChangeInfo, id]);
    }
    console.log(id);
  };

  return (
    <Container className={classes.wrapper}>
      <Typography component="h3" variant="h4" className={classes.title}>
        Module List
      </Typography>
      <Box sx={{ width: '100%', paddingLeft: '24px' }}>
        {
          [1, 2, 3].map((item) => (
            <Grid container={true} spacing={3}>
              <Grid xs={12} sm={12} md={2} lg={2}>
                <img alt="logo GTAS" src={newLogo} className={classes.img} />
              </Grid>
              <Grid xs={12} sm={12} md={10} lg={10}>
                {
                  listChangeInfo.includes(item) ? (
                    <Box className="button_function">
                      <Button variant="contained">live</Button>
                      <Button variant="contained">test</Button>
                    </Box>
                  ) : (
                    <Box className={`description ${classes.description}`}>
                      <p>Text buttons are typically used for less-pronounced actions, including those located: in dialogs, in cards. In cards, text buttons help maintain an emphasis on card content.</p>
                    </Box>
                  )
                }
                <Box>
                  <Button variant="contained" onClick={() => changeInfo(item)}>Contained</Button>
                </Box>
              </Grid>
            </Grid>
          ))
        }
      </Box>
    </Container>
  );
};
export default Home;
