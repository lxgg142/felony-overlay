// eslint-disable-next-line
window.$ = window.jQuery = require('jquery');

const modalWindow = {
  // eslint-disable-next-line
  getHTML: function (HTMLoptions) {
    return `
        <div class="modal_overlay ${HTMLoptions.class}">
            <div class="modal_window">
                <div class="modal_titlebar" style="background: ${HTMLoptions.colors.background}">
                    <div style="display: flex; align-items: center; ustify-content: center">
                    <span class="modal_icon material-icons" style="color: ${HTMLoptions.colors.title}">${HTMLoptions.icon}</span>
                    <span class="modal_title" style="color: ${HTMLoptions.colors.title}">${HTMLoptions.title}</span>
                    </div>
                    <p class="modal_close material-icons" style="color: ${HTMLoptions.colors.title}">close</p>
                </div>
                <div class="modal_content" style="${HTMLoptions.hasContent}">${HTMLoptions.content}</div>
            </div>
        </div>
        `;
  },

  open: function (options = {}) {
    if (options.type === 'error') {
      options.colors = {
        background: '#dc2626',
        title: '#7f1d1d',
      };
      options.title = 'Error';
      options.icon = 'cancel';
    } else if (options.type === 'success') {
      options.colors = {
        background: '#16a34a',
        title: '#365314',
      };
      options.title = 'Success';
      options.icon = 'check_circle';
    } else if (options.type === 'warn') {
      options.colors = {
        background: '#ca8a04',
        title: '#713f12',
      };
      options.title = 'Warning';
      options.icon = 'warning';
    } else {
      options.colors = {
        background: '#2563eb',
        title: '#1e3a8a',
      };
      options.title = 'Info';
      options.icon = 'info';
    }
    options = Object.assign(
      {
        title: ' ',
        content: ' ',
        hasContent: !options.content ? 'display: none' : '',
      },
      options
    );

    $(document.body).append(this.getHTML(options));
  },

  close: function () {
    $(this).parent().parent().parent().remove();
  },

  initialize: function () {
    $(document.body).on('click', '.modal_close', this.close);
  },
};

module.exports = { modalWindow };
