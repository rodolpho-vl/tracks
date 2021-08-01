import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
};

const signup =
  dispatch =>
  async ({ email, password }) => {
    // make api request to sign up with that email and password
    // if we sign up, modify our state and say that we are authenticated
    // if signing up failed, we probably need to reflect an error message somewhere

    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });

      // navigate do main flow
      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up.",
      });
    }
  };

const signin = dispatch => {
  return ({ email, password }) => {
    // try to sign in
    // handle success by updating state
    // handle failure by showing error message somehow
  };
};

const signout = dispatch => {
  return () => {
    // Somehow sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { token: null, errorMessage: "" }
);
