/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../services/api";
                              

export default (props) => {
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				console.log(authResult.code);
				const result = await googleAuth(authResult.code);
				console.log(result.data);
				props.setUser(result.data.data.user);
				alert("successfuly logged in");
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<button
			style={{
				padding: "10px 20px",
			}}
			onClick={googleLogin}
		>
			Sign in with Google
		</button>
	);
};
