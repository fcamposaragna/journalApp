import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { initialState, demoUser, authenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => {

    test('Debe regresar el estado inicial y llamarse "auth"', () => {

        expect( authSlice.name ).toBe('auth');
        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);

    });

    test('Debe realizar la autenticación', () => {

        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual({
            status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('Debe realizar el logout (sin argumentos)', () => {

        const state = authSlice.reducer( authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
        });
    })
    test('Debe realizar el logout y mostrar el mensaje de error', () => {

        const state = authSlice.reducer( authenticatedState, logout({errorMessage:'hubo un error'}));
        expect(state).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'hubo un error'
        });
    });

    test('Debe cambiar el estado a checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    })
})