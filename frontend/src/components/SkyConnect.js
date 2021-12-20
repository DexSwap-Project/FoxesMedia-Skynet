import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { skyconnect } from "../reducers/user";
import { Loader, Icon } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { SkynetContext } from "../state/SkynetContext";
import NewSkyClient from "./SkyClient";

export const StyledAuth = styled.div`
width: 385px;
padding: 3rem 1.5rem;
background: #171421;
border-radius: 4px;
margin: 8% auto;
border: 10px white;
border-radius: 15px;
box-shadow: 1px 2px 0 0 #a73306;

  h2 {
    margin-bottom: 1.3rem;
    text-align: center;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input-group input:last-child {
    margin-left: 0.7rem;
  }

  input {
    overflow: hidden;
    border-radius: 3px;
    width: 100%;
    padding: 0.6rem 1.2rem;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.primaryColor};
  }

  .action {
    margin-top: 1rem;
  }

  button {
    padding: 0.4rem 3rem;
    background: #736666d9;
    color: #fbfbfb;
    border: 1px solid #171421;
    border-radius: 3px;
    text-transform: uppercase;
    -webkit-letter-spacing: 1.1px;
    -moz-letter-spacing: 1.1px;
    -ms-letter-spacing: 1.1px;
    letter-spacing: 1.1px;
    box-shadow: 1px 2px 0 0 #a73306;
  }

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }

  @media screen and (max-width: 430px) {
    margin: 20% auto;
    width: 90%;
  }
`;

const SkyConnect = () => {
  const dispatch = useDispatch();

  const { mySky } = useContext(SkynetContext);
  const [loading, setLoading] = useState(true);
  const { fetchUserID, logout } = useStoreActions((state) => state.mySky);
  const { loggedIn } = useStoreState((state) => state.mySky);
  const dataDomain =
    window.location.hostname === "localhost" ? "localhost" : "skynet-mysky.hns";

  useEffect(() => {
    // if we have MySky loaded
    setLoading(true);
    if (mySky) {
      mySky.checkLogin().then((data) => {
        if (data) {
          fetchUserID({ mySky });
        }
        setLoading(false);
      });
    }
  }, [mySky]); // eslint-disable-line react-hooks/exhaustive-deps

  const onLogin = async () => {
    setLoading(true);
    mySky.requestLoginAccess().then((data) => {
      if (data) {
        fetchUserID({ mySky });
      }

      setLoading(false);
      handleSubmit();
    });
  };

  const onProcess = () => {
    logout({ mySky });
  };

  const handleSubmit = async () => {
    const mySky = await NewSkyClient.loadMySky(dataDomain);
    const userID = await mySky.userID();
    const payload = {
      userID,
    };
    console.table({ userID });
    dispatch(skyconnect({ payload }));
  };

  return (
    <StyledAuth>
      <h2>Connect with MySky</h2>
      <form style={{textAlign: "center"}}>
        {loading && (
          <button color="green" size="medium">
            <Loader inverted active inline="centered" size="tiny" />
          </button>
        )}
        {!loading && !loggedIn && (
          <button onClick={onLogin} color="green" size="medium">
            <Icon name="user" /> MySky Connect
          </button>
        )}
        {!loading && loggedIn && (
          <button onClick={onProcess} color="green" size="medium">
            <Loader inverted active inline="centered" size="tiny" />
            <span>Please Wait...</span>
          </button>
        )}
      </form>
    </StyledAuth>
  );
};

export default SkyConnect;
