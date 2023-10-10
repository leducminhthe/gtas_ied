import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

const TransitionCard:React.FC<any> = (props) => {
  const { classes, label, icon } = props;
  return (
    <div style={{
      minWidth: 300,
      minHeight: 120,
    }}
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          {
              icon
          }
          <Typography
            className="MuiTypography--heading"
            variant="h5"
            gutterBottom={true}
            align="center"
            style={{ marginTop: 10 }}
          >
            {label || ''}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
const WrappedTransitionCard = withStyles((muiBaseTheme:any) => ({
  card: {
    height: '100%',
    minWidth: 300,
    margin: 'auto',
    transition: '0.3s',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    '&:hover': {
      boxShadow: '0 16px 32px -12.125px rgba(0,0,0,0.3)',
      marginTop: -5,
    },
  },
  content: {
    height: '100%',
    textAlign: 'center',
    padding: muiBaseTheme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
  },
  subheading: {
    lineHeight: 1.8,
  },
}))(TransitionCard);
export default WrappedTransitionCard;
