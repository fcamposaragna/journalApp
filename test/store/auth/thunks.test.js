import { loginWhithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/provider'
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { chekingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';


jest.mock('../../../src/firebase/provider')

describe('Pruebas en los thunks de auth', () => {
    
    const dispatch = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('Debe convocar el checkingCredentials', async () => {

        await chekingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn debe llamar checkingCredentials y login', async () => {

        const loginData = { ok:true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toBeCalledWith(checkingCredentials());
        expect( dispatch ).toBeCalledWith(login(loginData));
    });

    test('startLoginWithEmailPassword debe llamar checkingCredentials y login', async () => {

        const logindata ={ ok: true, ...demoUser};
        const formData = { email: demoUser.emial, password:'123456'};

        await loginWhithEmailPassword.mockResolvedValue( logindata );
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); 
    });

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});