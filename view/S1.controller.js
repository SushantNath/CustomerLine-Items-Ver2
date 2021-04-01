/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/fin/arp/lib/lineitems/controller/AbstractController", "sap/m/MessageBox"], function(A, M) {
	"use strict";
	var S = sap.fin.arp.lib.lineitems.controller.AbstractController.extend("fin.ar.lineitems.display2.view.S1", {
		constructor: function() {
			A.apply(this, arguments);
			this.sLocalContainerKey = "fin.ar.lineitems";
			this.sPrefix = "fin.ar.lineitems.display2";
			this.sIconPath = "sap-icon://Fiori5/F0711";
			this.sOwnSemanticObject = "Customer";
			this.sCustomerVendorItemTypeKey = "V";
			this.initDeferred = jQuery.Deferred();
		},
		
		//Test deployment for WRICEF-7253, dev correction-initial commit- 2nd deploy
		onInit: function() {
			A.prototype.onInit.apply(this, arguments);
			this.setExtendedFooterOptions();
		},
		onExit: function() {
			this.cleanUpNavController();
		},
		onInitSmartFilterBar: function() {
			var t = this;
			this.initDeferred.done(function() {
				A.prototype.onInitSmartFilterBar.apply(t, arguments);
				t.checkForNavigation();
			});
		},
		onNavTargetsObtained: function(e) {
			this.openPopover(e, this.oi18n.getText("POPOVER_CLI_LINK"));
		},
		onBeforePopoverOpens: function(e) {
			var c = e.getParameters().semanticAttributes.Customer;
			var a = "/Customers(CustomerId='" + encodeURIComponent(c) + "')";
			this.createPopoverContent(e, a);
		},
		onButtonPressedSendCorrespondence: function() {
			if (this.aSelectedKeys.length <= this.MAX_NUMBER_OF_ITEMS) {
				this.sendCorrespondence("D", "Customer");
			} else {
				M.information(this.oi18nLib.getText("NO_ITEM_CHANGE_LIMIT", this.MAX_NUMBER_OF_ITEMS));
			}
		},
		onBeforeRendering: function() {
			this.onBeforeViewRendering();
		},
		setExtendedFooterOptions: function() {
			if (this.extHookModifyFooterOptions) {
				var o = this.extHookModifyFooterOptions({
					buttonList: []
				});
				if (o.buttonList && o.buttonList.length > 0) {
					this.addExtensionButtons(o);
				}
			}
		}
	});
	return S;
}, true);