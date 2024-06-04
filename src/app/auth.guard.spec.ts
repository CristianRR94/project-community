/* import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
}); */
import { TestBed } from '@angular/core/testing';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  it('should return true if token exists', () => {
    localStorage.setItem('token', 'fake-token');
    const result = authGuard();
    expect(result).toBeTrue();
  });

  it('should return false if token does not exist', () => {
    localStorage.removeItem('token');
    const result = authGuard();
    expect(result).toBeFalse();
  });
});
