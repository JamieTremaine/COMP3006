import { TestBed } from '@angular/core/testing';

import { Severity, ToastService } from './toast.service';

describe('ToastService', () => {
    let service: ToastService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToastService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should show toast messages', () => {
        service.show('message', Severity.success, 5000);
        expect(service.toasts).toEqual([{message: 'message', className: 'bg-success text-light high-z-index', duration: 5000}])

        service.show('message bad', Severity.danger, 5000);
        expect(service.toasts).toEqual([
            {message: 'message', className: 'bg-success text-light high-z-index', duration: 5000}, 
            {message: 'message bad', className: 'bg-danger text-light high-z-index', duration: 5000}])
    });
});
