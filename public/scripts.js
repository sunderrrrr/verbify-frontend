document.addEventListener('DOMContentLoaded', () => {
    // Инициализация всех Material компонентов
    const textFields = [].map.call(
        document.querySelectorAll('.mdc-text-field'),
        (el) => new mdc.textField.MDCTextField(el)
    );

    const buttons = [].map.call(
        document.querySelectorAll('.mdc-button'),
        (el) => new mdc.ripple.MDCRipple(el)
    );

    const topAppBar = new mdc.topAppBar.MDCTopAppBar(
        document.querySelector('.mdc-top-app-bar')
    );
});