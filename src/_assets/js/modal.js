import * as dom from './dom';
import * as classy from './classy';
import * as aria from './aria';
import * as event from './event';
import bus from './bus';

function modal () {
  // Cool nodes
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = dom.findElements('.js-modal-toggle');
  var modals = dom.findElements('.js-modal');

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  function dependentNodes () {
    var nodes = [];
    if (wrapper) {
      nodes.push(wrapper);
    }
    if (footer) {
      nodes.push(footer);
    }
    return nodes;
  }

  function openModal (modalId) {
    bus.emit('modal:close');
    if (!modalId) return;
    var modal = document.querySelector(`.js-modal[data-modal="${modalId}"]`);
    modal.removeAttribute('tabindex');
    event.add(document, 'focusin', fenceModal);
    classy.add(modal, 'is-active');
    aria.hide(dependentNodes());
    modal.focus();
  }

  function closeModal (modalId) {
    if (!modalId) return classy.removeActive(modals);
    var modal = document.querySelector(`.js-modal[data-modal="${modalId}"]`);
    classy.remove(modal, 'is-active');
    modal.setAttribute('tabindex', 0);
    event.remove(document, 'focusin', fenceModal);
    aria.show(dependentNodes());
  }

  function bindModals (node) {
    if (!node) {
      toggles.forEach(function (toggle) {
        event.add(toggle, event.click(), toggleClick);
      });
    } else {
      event.add(node, event.click(), toggleClick);
    }
  }

  function fenceModal (e) {
    if (!dom.closest('js-modal', e.target)) {
      modals.forEach(function (modal) {
        if (classy.has(modal, 'is-active')) {
          modal.focus();
        }
      });
    }
  }

  function toggleClick (e) {
    event.preventDefault(e);
    var modalId = e.target.dataset.modal;
    bus.emit('modal:open', modalId);
  }

  bus.emit('modal:bind');
}

export default modal;
