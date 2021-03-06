(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["medicion-medicion-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/medicion/medicion.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/medicion/medicion.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\r\n  <ion-grid class =\"ion-no-padding\">\r\n    <ion-row>\r\n      <ion-col size-sm=\"9\" offset-sm=\"1.5\" size-md=\"6\" offset-md=\"3\" size-lg=\"4\" offset-lg=\"4\" size-xl=\"3\" offset-lg=\"4.5\">\r\n        <ion-toolbar color = \"primary\">\r\n          <ion-buttons slot=\"start\">\r\n            <ion-back-button defaultHref=\"/home/dispositivo/{{dispositivo?.dispositivoId}}\"></ion-back-button>\r\n          </ion-buttons>\r\n          <ion-title>Mediciones</ion-title>\r\n        </ion-toolbar>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col size-sm=\"9\" offset-sm=\"1.5\" size-md=\"6\" offset-md=\"3\" size-lg=\"4\" offset-lg=\"4\" size-xl=\"3\" offset-lg=\"4.5\">\r\n        <ion-list>\r\n          <ion-item *ngFor=\"let medicion of mediciones\">\r\n            <ion-label>\r\n                <ion-grid>\r\n                  <ion-row>\r\n                    <ion-col size=\"3\">\r\n                      <p>Id: {{medicion.medicionId }}</p>\r\n                    </ion-col>\r\n                    <ion-col size=\"6\">\r\n                      <p>{{medicion.fecha | date:'dd/MM/yy HH:mm:ss' }}</p>\r\n                    </ion-col>\r\n                    <ion-col size=\"3\">\r\n                      <p>Valor = {{medicion.valor }}</p>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n            </ion-label>\r\n          </ion-item>\r\n        </ion-list>\r\n      </ion-col>\r\n    </ion-row>\r\n    \r\n  </ion-grid>\r\n</ion-content>\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/medicion/medicion-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/medicion/medicion-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: MedicionPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicionPageRoutingModule", function() { return MedicionPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _medicion_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./medicion.page */ "./src/app/medicion/medicion.page.ts");




const routes = [
    {
        path: '',
        component: _medicion_page__WEBPACK_IMPORTED_MODULE_3__["MedicionPage"]
    }
];
let MedicionPageRoutingModule = class MedicionPageRoutingModule {
};
MedicionPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], MedicionPageRoutingModule);



/***/ }),

/***/ "./src/app/medicion/medicion.module.ts":
/*!*********************************************!*\
  !*** ./src/app/medicion/medicion.module.ts ***!
  \*********************************************/
/*! exports provided: MedicionPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicionPageModule", function() { return MedicionPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _medicion_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./medicion-routing.module */ "./src/app/medicion/medicion-routing.module.ts");
/* harmony import */ var _medicion_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./medicion.page */ "./src/app/medicion/medicion.page.ts");







let MedicionPageModule = class MedicionPageModule {
};
MedicionPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _medicion_routing_module__WEBPACK_IMPORTED_MODULE_5__["MedicionPageRoutingModule"]
        ],
        declarations: [_medicion_page__WEBPACK_IMPORTED_MODULE_6__["MedicionPage"]]
    })
], MedicionPageModule);



/***/ }),

/***/ "./src/app/medicion/medicion.page.scss":
/*!*********************************************!*\
  !*** ./src/app/medicion/medicion.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lZGljaW9uL21lZGljaW9uLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/medicion/medicion.page.ts":
/*!*******************************************!*\
  !*** ./src/app/medicion/medicion.page.ts ***!
  \*******************************************/
/*! exports provided: MedicionPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicionPage", function() { return MedicionPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_dispositivo_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/dispositivo.service */ "./src/app/services/dispositivo.service.ts");
/* harmony import */ var _services_mediciones_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/mediciones.service */ "./src/app/services/mediciones.service.ts");





let MedicionPage = class MedicionPage {
    constructor(router, medicionService, dispositivoService) {
        this.router = router;
        this.medicionService = medicionService;
        this.dispositivoService = dispositivoService;
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let idDispositivo = this.router.snapshot.paramMap.get('id');
            try {
                this.dispositivo = (yield this.GetDispositivoById(idDispositivo));
                console.log(this.dispositivo);
                this.mediciones = (yield this.GetMedicionesByDispositivoId(this.dispositivo.dispositivoId));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    GetDispositivoById(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                return yield this.dispositivoService.getDispositivo(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetMedicionesByDispositivoId(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                return yield this.medicionService.getListadoMedicionByDispositivoId(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
MedicionPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _services_mediciones_service__WEBPACK_IMPORTED_MODULE_4__["MedicionesService"] },
    { type: _services_dispositivo_service__WEBPACK_IMPORTED_MODULE_3__["DispositivoService"] }
];
MedicionPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-medicion',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./medicion.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/medicion/medicion.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./medicion.page.scss */ "./src/app/medicion/medicion.page.scss")).default]
    })
], MedicionPage);



/***/ })

}]);
//# sourceMappingURL=medicion-medicion-module-es2015.js.map