
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';
import axios from "axios"
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
} from '../actions';
import { NotificationManager } from "../../components/common/react-notifications";

import {
    loginUserSuccess,
    loginUserError,
    registerUserSuccess,
    registerUserError,
    forgotPasswordSuccess,
    forgotPasswordError,
    resetPasswordSuccess,
    resetPasswordError
} from './actions';


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);



function* loginWithEmailPassword({ payload }) {
    const { email, password, type } = payload.user;
    const { history } = payload;
    console.log(payload)
    // localStorage.clear();
    try {
        var url;
        switch (type) {
            case 'tuteur':
                url = "http://api.onyx.inedit-gd.tn/tuteur/auth/login"
                break;
            case 'enseignant':
                url = "http://api.onyx.inedit-gd.tn/enseignant/auth/login"
                break;
            case 'adminstrateur':
                url = "http://api.onyx.inedit-gd.tn/admins/auth/login"
                break;
            default:
                url = "";
                break;
        }




        const data = yield axios({
            method: 'post',
            url: url,
            data: { "email": email, "password": password },
        })
            .then(res => res
                , error => error
            )
        console.log(data, 'dataaaa');
        if (data.status === 200) {

            var user_data = data.data;
            const { id, roles, statut, firstlogin, } = user_data;
            var loginUser = { user: { id, roles, statut, email, firstlogin } };
            localStorage.setItem('user_id', loginUser.user.id);
            localStorage.setItem('user_role', loginUser.user.roles);
            localStorage.setItem('statut', loginUser.user.statut);
            localStorage.setItem('email', loginUser.user.email);
            localStorage.setItem('firstlogin', loginUser.user.firstlogin);

            switch (type) {
                case 'adminstrateur':
                    localStorage.setItem('username', user_data.nomPrenom);

                    break;
                case 'tuteur':
                    localStorage.setItem('username', user_data.nom + " " + user_data.prenom);
                    localStorage.setItem('adresse', user_data.adresse);
                    localStorage.setItem('numtel', user_data.numTel);
                    localStorage.setItem('eleves', JSON.stringify(user_data.eleves));
                    // var obj = JSON.parse(localStorage.getItem('eleves'))
                    // console.log(obj[0].id)

                    break;
                case 'enseignant':
                    localStorage.setItem('username', user_data.nom + " " + user_data.prenom);
                    localStorage.setItem('adresse', user_data.adresse);
                    localStorage.setItem('numtel', user_data.numTel);
                    localStorage.setItem('classes', JSON.stringify(user_data.classe));
                    localStorage.setItem('domaines', JSON.stringify(user_data.domaine));

                    break;

            }






            yield put(loginUserSuccess(loginUser.user));



            if (loginUser.user.statut === "inactif")
                return NotificationManager.error(
                    type + "inactif",
                    type,
                    5000,
                    null,
                    null,
                );

            if (localStorage.getItem('user_id') && firstlogin === 0) {
                history.push(`/user/reset-password/${type}/${user_data.token}`);
                return;
            }

            if (['ROLE_GESTION_ECOLE', 'ROLE_EMPLOI', 'ROLE_NOTES', 'ROLE_CALENDRIER_EXAMENS', 'ROLE_ORGANISATION']
                .includes(localStorage.getItem('user_role').trim().split(' ')[0])
                // && loginUser.statut === "actif"
            ) {
                localStorage.setItem('accueil', '/ecole/accueil');
            }
            else if (loginUser.user.roles === "TUTEUR") {
                localStorage.setItem('accueil', '/parent/accueil');
            }
            else if (loginUser.user.roles === "ENS") {
                localStorage.setItem('accueil', '/enseignant/accueil');

            }
            history.push(localStorage.getItem('accueil'));

        } else {
            yield put(loginUserError("error login"));
            NotificationManager.error(
                "Erreur d'authentification",
                type,
                5000,
                null,
                null,
            );

        }





    } catch (error) {

        yield put(loginUserError(error));


    }


}


export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* registerWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload

    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        if (!registerUser.message) {
            localStorage.setItem('user_id', registerUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            history.push('/')
        } else {
            yield put(registerUserError(registerUser.message));

        }
    } catch (error) {
        yield put(registerUserError(error));
    }
}



export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
    await auth.signOut().then(authUser => authUser).catch(error => error);
    history.push('/')
}

function* logout({ payload }) {
    const { history } = payload
    try {
        yield call(logoutAsync, history);
        localStorage.clear();
        // localStorage.removeItem('user_id');
        // localStorage.removeItem('user_role');
    } catch (error) {
    }
}

export function* watchForgotPassword() {
    yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
    return await auth.sendPasswordResetEmail(email)
        .then(user => user)
        .catch(error => error);
}

function* forgotPassword({ payload }) {
    console.log(payload, 'forgotttttttt')
    var url = `http://api.onyx.inedit-gd.tn/${payload.type}/auth/ask_for_reset/${payload.forgotUserMail}`
    try {
        const data = yield axios({
            method: 'post',
            url: url,
        }).then(res => res, error => error)
        yield put(forgotPasswordSuccess("success"));
        // if (!forgotPasswordStatus) {

        // } else {
        //     yield put(forgotPasswordError(forgotPasswordStatus.message));
        // }
    } catch (error) {
        yield put(forgotPasswordError(error));

    }
}

export function* watchResetPassword() {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
    return await auth.confirmPasswordReset(resetPasswordCode, newPassword)
        .then(user => user)
        .catch(error => error);
}

function* resetPassword({ payload }) {

    const { newPassword } = payload;
    const { history } = payload;
    const { type } = payload;
    const { token } = payload;
    alert("reset", token, type,);

    try {

        var url = `http://api.onyx.inedit-gd.tn/${type}/auth/reset/${token}`;



        const data = yield axios({
            method: 'post',
            url: url,
            data: { "password": newPassword },
        }).then(res => res)


        if (data.status === 200) {
            NotificationManager.success(
                "Please login with your new password.",
                "Reset Password Success",
                3000,
                null,
                null,
                ''
            );
            history.push("/user/login");
        } else {
            yield put(resetPasswordError("Erreur réinitialisation de mot de passe"));
            NotificationManager.error(
                "Erreur réinitialisation de mot de passe",
                "MOT DE PASSE",
                5000,
                null,
                null,
            );


        }
    }

    catch (error) {

        yield put(resetPasswordError("Erreur réinitialisation de mot de passe"));

    }


    // const { newPassword, newPasswordAgain, resetPasswordCode } = payload;


    // try {
    //     const resetPasswordStatus = yield call(resetPasswordAsync, resetPasswordCode, newPassword);
    //     if (!resetPasswordStatus) {
    //         yield put(resetPasswordSuccess("success"));
    //     } else {
    //         yield put(resetPasswordError(resetPasswordStatus.message));
    //     }
    // } catch (error) {
    //     yield put(resetPasswordError(error));

    // }
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgotPassword),
        fork(watchResetPassword),
    ]);
}

// console.log(payload, 'login')
    // const { email, password, type } = payload.user;
    // const { history } = payload;



    // try {

    //     var url;
    //     switch (type) {
    //         case 'tuteur':
    //             url = "http://api.onyx.inedit-gd.tn/user/auth"
    //             break;
    //         case 'enseignant':
    //             url = "http://api.onyx.inedit-gd.tn/user/auth"
    //             break;
    //         case 'adminstrateur':
    //             url = "http://api.onyx.inedit-gd.tn/admins/auth/login"
    //             break;
    //         default:
    //             url = ""
    //     }


    //     yield axios({
    //         method: 'post',
    //         url: url,
    //         data: { "email": email, "password": password },
    //     })

    //         .then(res => {
    //             console.log('ress', res)

    //             if (res.status === 200) {
    //                 var loginUser = res.data
    //                 const { id, nomPrenom, email, dateCreation, roles, firstlogin, statut } = loginUser;
    //                 loginUser = { user: { id, nomPrenom, email, dateCreation, roles, firstlogin }, statut };
    //                 localStorage.setItem('user_id', loginUser.user.id);
    //                 localStorage.setItem('user_role', loginUser.user.roles);
    //                 localStorage.setItem('first_login', loginUser.user.firstlogin);
    //                 localStorage.setItem('type', type);

    //                 // console.log('eeeee',
    //                 //     ['ROLE_GESTION_ECOLE', 'ROLE_EMPLOI', 'ROLE_NOTES', 'ROLE_CALENDRIER_EXAMENS', 'ROLE_ORGANISATION']
    //                 //         .includes(localStorage.getItem('user_role').trim().split(' ')),
    //                 //     localStorage.getItem('user_role').trim().split(' ')[0],

    //                 // )
    //                 // yield put(loginUserSuccess(loginUser.user));


    //                 if (['ROLE_GESTION_ECOLE', 'ROLE_EMPLOI', 'ROLE_NOTES', 'ROLE_CALENDRIER_EXAMENS', 'ROLE_ORGANISATION']
    //                     .includes(localStorage.getItem('user_role').trim().split(' ')[0]) && firstlogin === 0
    //                 ) {

    //                     history.push('/ecole/accueil');
    //                     localStorage.setItem('accueil', '/ecole/accueil');

    //                 }
    //                 else if (loginUser.user.roles === "ROLE_PARENT" && firstlogin === 1) {
    //                     history.push('/parent/accueil');
    //                     localStorage.setItem('accueil', '/parent/accueil');

    //                 }
    //                 else if (loginUser.user.roles === "ROLE_ENS" && firstlogin === 1) {
    //                     history.push('/enseignant/accueil');
    //                     localStorage.setItem('accueil', '/enseignant/accueil');

    //                 }
    //             }

    //             // else {
    //             //     alert('erruerere')
    //             //     NotificationManager.error(
    //             //         "Erreur d'authentification",
    //             //         type,
    //             //         5000,
    //             //         null,
    //             //         null,
    //             //     );
    //             //     // yield put(loginUserError("error login"));


    //             // }

    //         }
    //             ,
    //             error => {

    //                 NotificationManager.error(
    //                     "Erreur d'authentification",
    //                     type,
    //                     2000,
    //                     null,
    //                     null,
    //                 );

    //                 yield put(loginUserError(error));

    //             }

    //         )


    // } catch (error) {
    //     console.log("failed" + error);
    //     NotificationManager.error(
    //         "Probléme au niveau de serveur",
    //         type,
    //         2000,
    //         null,
    //         null,
    //     );
    //     yield put(loginUserError(error));

    // }