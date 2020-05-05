export default class Forms {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.statusMessage = {
      loading: 'sending...',
      success: 'Soon we will contact you',
      failure: 'Opps!!'
    };
    this.path = 'assets/question.php';
  }

  validateMail() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach((item) => {
      item.addEventListener('keypress', (e) => {
        if (e.key.match(/[^a-z A-Z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      })
    })
  }

  initMask() {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos)
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
      }
    }

    function createMask() {
      let matrix = '+1(___)___-____',
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      def.length >= val.length && (val = def);

      matrix = matrix.replace(/[_\d]/g, function(a) {
        return val.charAt(i++) || "_"
      });
      this.value = matrix;

      i = matrix.lastIndexOf(val.substr(-1));

      i < matrix.length && matrix !== this.defaultValue ? i++ : i = matrix.indexOf("_");
      setCursorPosition(i, this)
    }

    document.querySelectorAll('[name="phone"]').forEach((item) => {
      item.addEventListener('input', createMask);
    })
  }

  async serviceData(url, data) {
    return await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  };

  init() {
    this.validateMail();
    this.initMask();
    this.forms.forEach((item) => {
      item.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.textContent = this.statusMessage.loading;
        statusMessage.style.cssText = `
          margin-top: 20px;
          color: grey;
          font-size: 18px;
        `;

        item.appendChild(statusMessage);

        const formData = new FormData(item);

        this.serviceData(this.path, formData)
          .then((res) => {
            statusMessage.textContent = this.statusMessage.success;
          }).catch((e) => {
          statusMessage.textContent = this.statusMessage.failure;
        }).finally(() => {
          item.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 6000)
        })
      })
    })
  }
}