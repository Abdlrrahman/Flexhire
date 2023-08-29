import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchGraphQL } from '../api/user-data/fetchGraphQL';
import styles from '../styles/Profile.module.css';
import Head from 'next/head';
import ReactPlayer from 'react-player'
import { Button, InputBase, OutlinedInput, TextField } from '@mui/material';
import Spinner from '../components/spinner';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Profile() {
  const [expanded, setExpanded] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);
  const [key, setKey] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setError(false);
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      setError(true);
      setErrorMessage('Input cannot be empty');
    } else {
      let result = await fetchGraphQL(inputValue)
      if (!!result.data) {
        if (!!result.data.currentUser) {
          setUserData(result.data);
          setLoading(false);
        } else {
          setError(true);
          setErrorMessage('Wrong Api Key');
        }
      }
      setInputValue('');
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FLEXHIRE_API_KEY;
    setKey(apiKey)
    let getData = async () => {
      let result = await fetchGraphQL(apiKey)
      console.log('result', result)
      if (!!result.data && result) {
        setUserData(result.data)
        setLoading(false)
      } else {
        setLoading(false)
        setUserData(null)
      }
    }
    getData()
  }, []);


  if (isLoading) return <Spinner />
  if (!userData) return (
    <div className={styles.container}>
    <Head>
      <title>Profile Page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <CardHeader
      className={styles.experienceTitle}
      title={'No profile data'}
    />
        <Card sx={{ maxWidth: 345 }} className={styles.profileCard}>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Input API Key"
                value={inputValue}
                onChange={handleChange}
                variant="outlined"
                error={error}
                helperText={errorMessage}
              />
            </div>
            <div className={styles.experience}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>

        </Card>
      </div>
  ); 

  return (
    <div className={styles.container}>
      <Head>
        <title>Profile Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card sx={{ maxWidth: 345 }} className={styles.profileCard}>
        <CardHeader
          className={styles.experienceTitle}
          title={userData.currentUser.name}
        />
        <CardMedia
          component="img"
          height="345"
          image={userData.currentUser.avatarUrl}
          alt="Profile Pictrue"
        />
        <CardContent>

          <Typography className={styles.experienceTitle} fontWeight={'bold'} variant="body2" color="text.secondary">
            Industry: {userData.currentUser.timelineEntries[0].skills[1].featuredFreelancerTypes[0].name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            style={{ width: '100%', textAlign: 'center' }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              <Typography className={styles.experienceTitle} fontWeight={'bold'} variant="body2" color="text.secondary">
                Experince:
              </Typography>
              {userData.currentUser.userSkills.map((item, key) => (

                <Typography className={styles.experience} key={key} variant="body2" color="text.secondary">
                  <Typography paragraph fontWeight={'bold'}>{item.skill.name}</Typography>
                  Years of experince:
                  {item.experience}{" "}
                </Typography>
              ))}
            </div>
            <div className={styles.playerWrapper}>
              <Typography className={styles.experienceTitle} fontWeight={'bold'} variant="body2" color="text.secondary">
                Video Answers:
              </Typography>
              {userData.currentUser.answers.map((item, key) => (

                <Typography className={styles.experience} key={key} variant="body2" color="text.secondary">
                  <Typography paragraph fontWeight={'bold'}>{item.question.title}</Typography>
                  <ReactPlayer className={styles.reactPlayer} url={item.optimizedUrl} controls={true} height={'100%'} width={'100%'} />
                </Typography>
              ))}
            </div>

          </CardContent>
        </Collapse>
      </Card>
      <div className={styles.container}>
        <Card sx={{ maxWidth: 345 }} className={styles.profileCard}>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Input API Key"
                value={inputValue}
                onChange={handleChange}
                variant="outlined"
                error={error}
                helperText={errorMessage}
              />
            </div>
            <div className={styles.experience}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>

        </Card>
      </div>
    </div>
  );
}