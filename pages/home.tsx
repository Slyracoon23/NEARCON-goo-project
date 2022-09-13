import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import NewSong from '../components/NewSong';
import CardBase from '../components/CardBase';
import ThemeProvider from '../theme/ThemeProvider';
import GlobalStyle from '../theme/GlobalStyle';

const Container = styled(CardBase)`
    max-width: 500px;
    margin: auto;
    margin-bottom: 4em;
    border-radius: 8px;
    @media (max-width: 768px) {
      margin: 0.5em;
      margin-bottom: 3.6em;
      margin-top: 0em;
    }
`

const Collection = styled.div`
    margin-bottom: 2em;
`

const HeaderText = styled.h1`
    font-family: 'Clash Display';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    color: #FFFFFF;
`


const NewSongCollection = styled.div`
`


const NewSongRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const Home = () => {
  return (
    <ThemeProvider>
      <Container>
        <Collection>
        <HeaderText>{"Discover New Artists 👀"}</HeaderText>
        <NewSongCollection>
                <NewSongRow>
                    <NewSong song={"Beans"} artist={"Bonny B"}/>
                    <NewSong song={"i miss u"} artist={"Sponge"}/>
                </NewSongRow>
        </NewSongCollection>
        </Collection>
      </Container>
    </ThemeProvider>
  )
}

export default Home;
