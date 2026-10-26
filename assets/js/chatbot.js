/**
 * CABAÑAS AMOR.ES - CHATBOT ASISTENTE AUTOMÁTICO
 * Respuestas fijas y enlace directo a WhatsApp
 */

(function () {
  'use strict';

  // SVG Icons for maximum crispness and zero external dependencies
  const ICONS = {
    whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;flex-shrink:0"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.952 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.5-1.787-1.676-2.088-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.151-.176.201-.301.301-.502.101-.2.05-.376-.025-.526-.075-.151-.676-1.63-.927-2.233-.244-.587-.492-.508-.676-.517l-.577-.01c-.2 0-.527.075-.802.376s-1.054 1.029-1.054 2.511 1.079 2.912 1.229 3.113c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.229 1.378.197 1.898.119.58-.087 1.78-.727 2.03-1.43.25-.703.25-1.305.176-1.43-.076-.126-.276-.201-.577-.352zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.94.55 3.75 1.5 5.29L2 22l4.89-1.54a9.92 9.92 0 0 0 5.15 1.46c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2z"/></svg>`,
    maps: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;flex-shrink:0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`
  };

  // Base data with exact questions, responses, and WhatsApp URLs
  const CHAT_DATA = {
    phone: '527714654896',
    welcome: {
      text: "¡Hola! Somos Cabañas Amor.es, cabañas en Santa Rosalía, Mineral del Monte (Real del Monte), Hidalgo, con el bosque a unos pasos. Te contamos de nuestras cabañas, si aceptamos mascotas, dónde estamos y qué hay cerca. Reservaciones, fechas, disponibilidad, montos y pagos los atiende nuestro equipo por WhatsApp. ¿En qué te ayudamos?",
      buttons: [
        {
          label: "Escribir por WhatsApp",
          url: "https://wa.me/527714654896?text=Hola%20Caba%C3%B1as%20Amor.es%2C%20les%20escribo%20desde%20la%20prueba%20de%20su%20p%C3%A1gina.%20Me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20de%20las%20caba%C3%B1as.",
          type: "whatsapp"
        }
      ]
    },
    faq: [
      {
        id: "mascotas",
        chipLabel: "Mascotas",
        question: "¿Puedo llevar a mi perro?",
        keywords: ["perro", "perros", "mascota", "mascotas", "gato", "gatos", "animal", "animales", "pet", "pets", "canino", "perrito"],
        answer: "¡Sí! Somos pet-friendly: puedes traer a tus perros, gatos u otras mascotas para que disfruten contigo de unas vacaciones en la naturaleza, con el bosque muy cerca. Cualquier detalle de tu mascota y tus fechas, coméntalo con nuestro equipo por WhatsApp.",
        buttons: [
          {
            label: "Escribir por WhatsApp",
            url: "https://wa.me/527714654896?text=Hola%20Caba%C3%B1as%20Amor.es%2C%20les%20escribo%20desde%20la%20prueba%20de%20su%20p%C3%A1gina.%20Quiero%20ir%20con%20mi%20mascota.%20%C2%BFPuedo%20llevar%20a%20mi%20perro%3F",
            type: "whatsapp"
          }
        ]
      },
      {
        id: "ubicacion",
        chipLabel: "Ubicación",
        question: "¿Dónde están?",
        keywords: ["donde", "estan", "ubicacion", "llegar", "como llegar", "direccion", "mapa", "maps", "ruta", "camino", "localizacion", "queda", "carretera"],
        answer: "Estamos en Santa Rosalía, Mineral del Monte (Real del Monte), Hidalgo, a un paso del bosque: puedes caminar entre los árboles, respirar aire fresco y escuchar a las aves sin ir lejos. Estamos a unos 3 minutos caminando de la Presa Santa Rosalía y a unos 10 minutos en vehículo del pueblo mágico Real del Monte. En nuestra página está la ruta en Google Maps; huéspedes comentan que los señalamientos no son muy vistosos, así que conviene seguirla.",
        buttons: [
          {
            label: "Ver ruta en Google Maps",
            url: "https://maps.app.goo.gl/ePtMyFg4tcYcE43Z6",
            type: "maps"
          },
          {
            label: "Preguntar por WhatsApp",
            url: "https://wa.me/527714654896?text=Hola%20Caba%C3%B1as%20Amor.es%2C%20les%20escribo%20desde%20la%20prueba%20de%20su%20p%C3%A1gina.%20Quisiera%20indicaciones%20para%20llegar.%20%C2%BFD%C3%B3nde%20est%C3%A1n%3F",
            type: "whatsapp"
          }
        ]
      },
      {
        id: "cabanas",
        chipLabel: "Tipos de cabaña",
        question: "¿Qué cabañas tienen?",
        keywords: ["cabana", "cabanas", "cabaña", "cabañas", "tipo", "tipos", "individual", "romance", "familiar", "doble", "jacuzzi", "habitaciones", "recamara", "recamaras", "esperanza", "libertad", "empatia", "fogata", "asador"],
        answer: "Contamos con 12 cabañas en tres tipos:<br><br>• <strong>Individual</strong> (como Esperanza, Libertad y Empatía): cama matrimonial, baño con regadera, jardín y zona de fogata y asador.<br>• <strong>Romance</strong> (Hermoso Cariño y Entre Sábanas y Besos): cama king size, baño con regadera y jacuzzi, más fogata y asador.<br>• <strong>Familiar o Doble</strong> (Familia, Igualdad, Salud y Unión): 2 recámaras independientes con cama matrimonial cada una, baño y sala, más fogata y asador.<br><br>Todas con amplio estacionamiento. La disponibilidad para tus fechas la confirma nuestro equipo por WhatsApp.",
        buttons: [
          {
            label: "Preguntar por WhatsApp",
            url: "https://wa.me/527714654896?text=Hola%20Caba%C3%B1as%20Amor.es%2C%20les%20escribo%20desde%20la%20prueba%20de%20su%20p%C3%A1gina.%20Me%20interesa%20una%20caba%C3%B1a.%20%C2%BFQu%C3%A9%20caba%C3%B1as%20tienen%3F",
            type: "whatsapp"
          }
        ]
      },
      {
        id: "cerca",
        chipLabel: "Qué hay cerca",
        question: "¿Qué hay cerca?",
        keywords: ["cerca", "alrededor", "alrededores", "que hay cerca", "actividades", "turismo", "presa", "penas cargadas", "peñas cargadas", "pueblo magico", "omitlan", "huasca", "prismas", "navajas", "chico", "visitar"],
        answer: "Cerca de nuestras cabañas:<br><br>• <strong>Presa Santa Rosalía:</strong> a unos 3 minutos caminando<br>• <strong>Peñas Cargadas:</strong> a unos 5 minutos en vehículo<br>• <strong>Real del Monte (pueblo mágico):</strong> a unos 10 minutos en vehículo<br>• <strong>Omitlán de Juárez:</strong> pintoresco pueblo<br>• <strong>Huasca de Ocampo y sus bosques</strong><br>• <strong>Prismas Basálticos</strong><br>• <strong>Cerro de las Navajas:</strong> para senderismo<br>• <strong>Mineral del Chico:</strong> pueblo mágico con montañas y cascadas",
        buttons: [
          {
            label: "Ver ruta a las cabañas",
            url: "https://maps.app.goo.gl/ePtMyFg4tcYcE43Z6",
            type: "maps"
          },
          {
            label: "Preguntar por WhatsApp",
            url: "https://wa.me/527714654896?text=Hola%20Caba%C3%B1as%20Amor.es%2C%20les%20escribo%20desde%20la%20prueba%20de%20su%20p%C3%A1gina.%20%C2%BFQu%C3%A9%20hay%20cerca%3F",
            type: "whatsapp"
          }
        ]
      },
      {
        id: "desayuno",
        chipLabel: "Desayuno",
        question: "¿Tienen desayuno?",
        keywords: ["desayuno", "desayunos", "comida", "comer", "alimento", "alimentos", "desayunar", "restaurante", "cafe", "menu"],
        answer: "Sí ofrecemos desayunos, con costo extra: en tu cabaña o al aire libre (aplican restricciones). Los detalles te los da nuestro equipo por WhatsApp.",
        buttons: [
          {
            label: "Preguntar por WhatsApp",
            url: "https://wa.me/527714654896?text=Hola%20Caba%C3%B1as%20Amor.es%2C%20les%20escribo%20desde%20la%20prueba%20de%20su%20p%C3%A1gina.%20Me%20interesa%20el%20desayuno.%20%C2%BFTienen%20desayuno%3F",
            type: "whatsapp"
          }
        ]
      },
      {
        id: "reservar",
        chipLabel: "Reservar",
        question: "¿Cómo reservo?",
        keywords: ["reservar", "reserva", "reservacion", "reservaciones", "precio", "precios", "costo", "costos", "tarifa", "tarifas", "cuanto", "cuanto cuesta", "disponibilidad", "fechas", "pago", "pagos", "apartar", "cotizar", "cotizacion"],
        answer: "Las reservaciones, las fechas y la disponibilidad las confirma directamente nuestro equipo por WhatsApp (771 465 4896). Por aquí no apartamos ni reservamos, pero con gusto te pasamos con ellos.",
        buttons: [
          {
            label: "Reservar por WhatsApp",
            url: "https://wa.me/527714654896?text=Hola%20Caba%C3%B1as%20Amor.es%2C%20les%20escribo%20desde%20la%20prueba%20de%20su%20p%C3%A1gina.%20Me%20gustar%C3%ADa%20reservar.%20%C2%BFC%C3%B3mo%20reservo%3F",
            type: "whatsapp"
          }
        ]
      }
    ]
  };

  // Helper: Normalize strings for fuzzy keyword search
  function normalizeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/[^a-z0-9\s]/g, ' ')   // remove punctuation
      .trim();
  }

  // Helper: Format current time (HH:MM)
  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
  }

  // Create Chatbot DOM elements
  function initChatbotDOM() {
    if (document.getElementById('amores-chatbot-widget')) return;

    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'amores-chatbot-widget';

    widgetContainer.innerHTML = `
      <!-- Launcher Trigger Button -->
      <button id="amores-chat-launcher" class="amores-chat-launcher" aria-label="Abrir asistente virtual" title="Asistente Cabañas Amor.es">
        <div class="amores-launcher-pulse"></div>
        <span class="launcher-icon-open">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </span>
        <span class="launcher-icon-close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </span>
      </button>

      <!-- Teaser bubble -->
      <div id="amores-launcher-teaser" class="amores-launcher-teaser">
        💬 ¡Hola! ¿En qué te ayudamos?
      </div>

      <!-- Chat Window -->
      <div id="amores-chat-window" class="amores-chat-window" role="dialog" aria-modal="true" aria-label="Chat de Cabañas Amor.es">
        
        <!-- Header -->
        <div class="amores-chat-header">
          <div class="amores-header-profile">
            <div class="amores-header-avatar">
              <img src="favicon.png" alt="Cabañas Amor.es" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3063/3063823.png'">
              <span class="amores-avatar-status"></span>
            </div>
            <div class="amores-header-info">
              <h4>Cabañas Amor.es</h4>
              <p><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#25d366;margin-right:3px;"></span> En línea · Asistente Virtual</p>
            </div>
          </div>
          <div class="amores-header-actions">
            <button id="amores-btn-restart" class="amores-header-btn" title="Reiniciar conversación" aria-label="Reiniciar conversación">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
            <button id="amores-btn-minimize" class="amores-header-btn" title="Minimizar" aria-label="Minimizar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button id="amores-btn-close" class="amores-header-btn" title="Cerrar" aria-label="Cerrar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Sticky Notice Banner -->
        <div class="amores-notice-banner">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div><strong>Asistente automático con respuestas fijas.</strong> Reservaciones, fechas, disponibilidad, montos y pagos: nuestro equipo por WhatsApp.</div>
        </div>

        <!-- Messages scroll container -->
        <div id="amores-chat-messages" class="amores-chat-messages" aria-live="polite">
          <!-- Populated dynamically via JS -->
        </div>

        <!-- Quick Question Chips -->
        <div class="amores-chips-wrapper">
          <div class="amores-chips-title">Preguntas frecuentes:</div>
          <div id="amores-chips-container" class="amores-chips-container">
            <!-- Chips rendered dynamically -->
          </div>
        </div>

        <!-- Footer / Input Form ("Tu pregunta") -->
        <div class="amores-chat-footer">
          <form id="amores-chat-form" class="amores-chat-form" autocomplete="off">
            <input 
              type="text" 
              id="amores-chat-input" 
              class="amores-chat-input" 
              placeholder="Tu pregunta..." 
              aria-label="Tu pregunta" 
              maxlength="200"
            />
            <button type="submit" id="amores-chat-send" class="amores-chat-send" aria-label="Enviar pregunta">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>

      </div>
    `;

    document.body.appendChild(widgetContainer);
  }

  // Main Controller
  function initChatbotLogic() {
    const launcher = document.getElementById('amores-chat-launcher');
    const teaser = document.getElementById('amores-launcher-teaser');
    const chatWindow = document.getElementById('amores-chat-window');
    const messagesContainer = document.getElementById('amores-chat-messages');
    const chipsContainer = document.getElementById('amores-chips-container');
    const form = document.getElementById('amores-chat-form');
    const input = document.getElementById('amores-chat-input');
    const btnClose = document.getElementById('amores-btn-close');
    const btnMinimize = document.getElementById('amores-btn-minimize');
    const btnRestart = document.getElementById('amores-btn-restart');

    let isOpen = false;
    let isTyping = false;

    // Render quick question chips
    function renderChips() {
      chipsContainer.innerHTML = '';
      CHAT_DATA.faq.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'amores-chip-btn';
        btn.textContent = item.chipLabel;
        btn.addEventListener('click', () => {
          if (isTyping) return;
          handleUserQuery(item.question, item);
        });
        chipsContainer.appendChild(btn);
      });
    }

    // Scroll to bottom of message list
    function scrollToBottom() {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 50);
    }

    // Append user message bubble
    function appendUserMessage(text) {
      const row = document.createElement('div');
      row.className = 'amores-msg-row user';
      row.innerHTML = `
        <div class="amores-msg-content">
          <div class="amores-msg-bubble">
            <p>${escapeHTML(text)}</p>
          </div>
          <span class="amores-msg-time">${getCurrentTime()}</span>
        </div>
      `;
      messagesContainer.appendChild(row);
      scrollToBottom();
    }

    // Append bot message bubble with action buttons
    function appendBotMessage(htmlContent, buttons = []) {
      const row = document.createElement('div');
      row.className = 'amores-msg-row bot';

      let buttonsHTML = '';
      if (buttons && buttons.length > 0) {
        buttonsHTML = '<div class="amores-msg-actions">';
        buttons.forEach(btn => {
          const btnClass = btn.type === 'maps' ? 'amores-btn-maps' : 'amores-btn-whatsapp';
          const iconSVG = btn.type === 'maps' ? ICONS.maps : ICONS.whatsapp;
          buttonsHTML += `
            <a href="${btn.url}" target="_blank" rel="noopener noreferrer" class="amores-btn-action ${btnClass}">
              ${iconSVG} <span>${escapeHTML(btn.label)}</span>
            </a>
          `;
        });
        buttonsHTML += '</div>';
      }

      row.innerHTML = `
        <div class="amores-msg-avatar">
          <img src="favicon.png" alt="Bot" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3063/3063823.png'">
        </div>
        <div class="amores-msg-content">
          <div class="amores-msg-bubble">
            ${htmlContent}
            ${buttonsHTML}
          </div>
          <span class="amores-msg-time">${getCurrentTime()}</span>
        </div>
      `;
      messagesContainer.appendChild(row);
      scrollToBottom();
    }

    // Show typing indicator
    function showTyping() {
      const typingRow = document.createElement('div');
      typingRow.id = 'amores-typing-row';
      typingRow.className = 'amores-msg-row bot';
      typingRow.innerHTML = `
        <div class="amores-msg-avatar">
          <img src="favicon.png" alt="Bot" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3063/3063823.png'">
        </div>
        <div class="amores-typing-indicator">
          <span class="amores-typing-dot"></span>
          <span class="amores-typing-dot"></span>
          <span class="amores-typing-dot"></span>
        </div>
      `;
      messagesContainer.appendChild(typingRow);
      scrollToBottom();
      isTyping = true;
    }

    // Remove typing indicator
    function removeTyping() {
      const typingRow = document.getElementById('amores-typing-row');
      if (typingRow) {
        typingRow.remove();
      }
      isTyping = false;
    }

    // Handle user query (either from chip or typed input)
    function handleUserQuery(queryText, matchedItem = null) {
      if (!queryText || !queryText.trim()) return;

      appendUserMessage(queryText);
      showTyping();

      setTimeout(() => {
        removeTyping();

        // 1. If explicit item passed (from chip)
        if (matchedItem) {
          appendBotMessage(`<p>${matchedItem.answer}</p>`, matchedItem.buttons);
          return;
        }

        // 2. Search keyword match in FAQ
        const normalized = normalizeText(queryText);
        let found = null;

        for (const item of CHAT_DATA.faq) {
          // Check question itself
          if (normalized.includes(normalizeText(item.question))) {
            found = item;
            break;
          }
          // Check keywords
          for (const kw of item.keywords) {
            const normKw = normalizeText(kw);
            if (normalized.includes(normKw)) {
              found = item;
              break;
            }
          }
          if (found) break;
        }

        if (found) {
          appendBotMessage(`<p>${found.answer}</p>`, found.buttons);
        } else {
          // Fallback response with WhatsApp button containing user's exact query
          const encodedQuery = encodeURIComponent(`Hola Cabañas Amor.es, les escribo desde la página web. Mi pregunta es: ${queryText}`);
          const fallbackURL = `https://wa.me/${CHAT_DATA.phone}?text=${encodedQuery}`;
          const fallbackHTML = `
            <p>Para brindarte información exacta sobre tu consulta, fechas, cotizaciones o disponibilidad, nuestro equipo te atiende con gusto por WhatsApp:</p>
          `;
          appendBotMessage(fallbackHTML, [
            {
              label: "Consultar por WhatsApp",
              url: fallbackURL,
              type: "whatsapp"
            }
          ]);
        }
      }, 420);
    }

    // Toggle chat open / closed
    function toggleChat(forceOpen = null) {
      if (forceOpen !== null) {
        isOpen = forceOpen;
      } else {
        isOpen = !isOpen;
      }

      if (isOpen) {
        chatWindow.classList.add('is-open');
        launcher.classList.add('is-active');
        if (teaser) teaser.classList.remove('show-teaser');
        setTimeout(() => {
          input.focus();
        }, 300);
      } else {
        chatWindow.classList.remove('is-open');
        launcher.classList.remove('is-active');
      }
    }

    // Restart conversation to initial welcome state
    function restartChat() {
      messagesContainer.innerHTML = '';
      appendBotMessage(`<p>${CHAT_DATA.welcome.text}</p>`, CHAT_DATA.welcome.buttons);
    }

    // Escape HTML to prevent XSS
    function escapeHTML(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Bind event listeners
    launcher.addEventListener('click', () => toggleChat());
    btnClose.addEventListener('click', () => toggleChat(false));
    btnMinimize.addEventListener('click', () => toggleChat(false));
    btnRestart.addEventListener('click', restartChat);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val || isTyping) return;
      input.value = '';
      handleUserQuery(val);
    });

    // Initialize chips & welcome message
    renderChips();
    restartChat();

    // REQUIREMENT: "EN EL INDEX, AL ENTRAR MOSTRAR UN CHATBOOT CON ESTA INFO"
    // Automatically open the chatbot upon entry with a smooth gentle delay
    setTimeout(() => {
      toggleChat(true);
    }, 600);
  }

  // Run when document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initChatbotDOM();
      initChatbotLogic();
    });
  } else {
    initChatbotDOM();
    initChatbotLogic();
  }
})();
