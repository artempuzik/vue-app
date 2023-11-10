import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    header: {
      nav_dashboard: 'Dashboard',
      nav_list: 'List',
      nav_history: 'History',
      question: 'Are you sure?'
    },
    menu: {
      account: 'Account',
      settings: 'Settings',
      management: 'Team Management',
      logout: 'Logout'
    },
    buttons: {
      save: 'Save',
      send: 'Send',
      back: 'Back',
      delete: 'Delete',
      ok: 'Okay',
      yes: 'Yes',
      change_role: 'Change role',
      invite: 'Invite',
      invite_member: '+Invite Member'
    },
    settings: {
      settings: 'Settings',
      language: 'Language',
      currency: 'Currency',
      timezone: 'Timezone',
      date_format: 'Date Format'
    },
    auth: {
      sign_in_title: 'Welcome to Relu',
      sign_in_sub_title: 'Sign in with your corporate email and password',
      sign_up_sub_email_title: 'Sign up in Relu using your corporate email',
      exist_account_text: 'Already have an account?',
      not_exist_account_text: 'Don’t have a Relu account yet?',
      sign_up_error_one: 'You don’t have access to your corporate Relu account. Contact your admin team for this issue.',
      sign_up_error_two: 'Your company don’t use Relu right now. But you have a chance to fix it!',
      forgot_password: 'Forgot your password?',
      ups: 'Ups ...',
      reset_password_title: 'Reset password',
      reset_password_sub_title: 'You will get a reset code on your corporate email',
      code: 'Code',
      sign_in: 'Sign in',
      sign_up: 'Sign up',
      get_started: 'Get Started',
      send: 'Send',
      back: 'Back',
      demo: 'Demo?',
      contact_sales: 'Contact Sales',
      first_name: 'First name',
      last_name: 'Last name',
      password: 'Password',
      new_password: 'New password',
      confirm: 'Confirm password',
      email: 'Email'
    },
    profile: {
      first_name: 'First name',
      last_name: 'Last name',
      password: 'Password',
      new_password: 'New password',
      confirm: 'Confirm password',
      email: 'Email',
      profile: 'Profile',
      change_password: 'Change password'
    },
    team: {
      title: 'Team management',
      members: 'Members',
      name: 'Name, Surname',
      email: 'Email',
      role: 'Role',
      created: 'Created',
      last_use: 'Last use',
      invite_text: "Please enter the user's email for invitation",
      remove_member: 'Remove member',
      search_placeholder: 'Search for member...'
    },
    history: {
      search_placeholder: 'Search by SKU or product name ...',
      sku: 'SKU',
      name: 'Name, Category',
      old_price: 'Old price',
      new_price: 'New price',
      date: 'Date',
      made_by: 'Made by',
      rule: 'Rule',
    }
  },
  pl: {
    header: {
      nav_dashboard: 'Panel',
      nav_list: 'Lista',
      nav_history: 'Historia',
      question: 'Jesteś pewny?'
    },
    menu: {
      account: 'Konto',
      settings: 'Ustawienia',
      management: 'Zarządzanie zespołem',
      logout: 'Wyloguj'
    },
    buttons: {
      save: 'Zapisz',
      send: 'Wysłać',
      back: 'Z powrotem',
      delete: 'Usuwać',
      ok: 'Dobra',
      yes: 'Tak',
      change_role: 'Zmień rolę',
      invite: 'Zapraszać',
      invite_member: '+Zaproś członka'
    },
    settings: {
      settings: 'Ustawienia',
      language: 'Język',
      currency: 'Waluta',
      timezone: 'Strefa czasowa',
      date_format: 'Format daty'
    },
    profile: {
      first_name: 'Imię',
      last_name: 'Nazwisko',
      password: 'Hasło',
      new_password: 'Nowe hasło',
      confirm: 'Potwierdź hasło',
      email: 'E-mail',
      profile: 'Profil',
      change_password: 'Zmień hasło'
    },
    auth: {
      sign_in_title: 'Witamy w Relu',
      sign_in_sub_title: 'Zaloguj się za pomocą firmowego adresu e-mail i hasła',
      sign_up_sub_email_title: 'Zarejestruj się w Relu przy użyciu firmowego adresu e-mail',
      exist_account_text: 'Masz już konto?',
      not_exist_account_text: 'Nie masz jeszcze konta Relu?',
      sign_up_error_one: 'Nie masz dostępu do swojego firmowego konta Relu. Skontaktuj się z zespołem administracyjnym w tej sprawie.',
      sign_up_error_two: 'Twoja firma nie korzysta obecnie z Relu. Ale masz szansę to naprawić!',
      forgot_password: 'Zapomniałeś hasła?',
      ups: 'Ups ...',
      reset_password_title: 'Zresetuj hasło',
      reset_password_sub_title: 'Otrzymasz kod resetujący na swój firmowy adres e-mail',
      code: 'Kod',
      sign_in: 'Zaloguj się',
      sign_up: 'Zarejestruj się',
      get_started: 'Rozpocznij',
      send: 'Wyślij',
      back: 'Wstecz',
      demo: 'Demonstracja?',
      contact_sales: 'Skontaktuj się ze sprzedażą',
      first_name: 'Imie',
      last_name: 'Nazwisko',
      password: 'Hasło',
      new_password: 'Nowe hasło',
      confirm: 'Potwierdź hasło',
      email: 'E-mail'
    },
    team: {
      title: 'Zarządzanie zespołem',
      members: 'Członkowie',
      name: 'Imię, Nazwisko',
      email: 'E=Mail',
      role: 'Rola',
      created: 'Utworzono',
      last_use: 'Ostatnie użycie',
      invite_text: 'Wprowadź adres e-mail użytkownika, aby otrzymać zaproszenie',
      remove_member: 'Usuń członka',
      search_placeholder: 'Wyszukaj członka...'
    }
  },
  de: {
    header: {
      nav_dashboard: 'Armaturenbrett',
      nav_list: 'Aufführen',
      nav_history: 'Geschichte',
      question: 'Bist du sicher?'
    },
    menu: {
      account: 'Konto',
      settings: 'Einstellungen',
      management: 'Team Management',
      logout: 'Ausloggen'
    },
    buttons: {
      save: 'Speichern',
      send: 'Schicken',
      back: 'Zurück',
      delete: 'Löschen',
      ok: 'Okay',
      yes: 'Ja',
      change_role: 'Rolle wechseln',
      invite: 'Einladen',
      invite_member: '+Mitglied einladen'
    },
    settings: {
      settings: 'Einstellungen',
      language: 'Sprache',
      currency: 'Währung',
      timezone: 'Zeitzone',
      date_format: 'Datumsformat'
    },
    profile: {
      first_name: 'Vorname',
      last_name: 'Familienname',
      password: 'Passwort',
      new_password: 'Neues Kennwort',
      confirm: 'Bestätige das Passwort',
      email: 'Email',
      profile: 'Profil',
      change_password: 'Kennwort ändern'
    },
    auth: {
      sign_in_title: 'Willkommen bei Relu',
      sign_in_sub_title: 'Melden Sie sich mit Ihrer Firmen-E-Mail-Adresse und Ihrem Passwort an',
      sign_up_sub_email_title: 'Melden Sie sich mit Ihrer Firmen-E-Mail-Adresse bei Relu an',
      exist_account_text: 'Haben Sie bereits ein Konto?',
      not_exist_account_text: 'Sie haben noch kein Relu-Konto?',
      sign_up_error_one: 'Sie haben keinen Zugriff auf Ihr Firmen-Relu-Konto. Wenden Sie sich wegen dieses Problems an Ihr Admin-Team.',
      sign_up_error_two: 'Ihr Unternehmen nutzt Relu derzeit nicht. Aber Sie haben eine Chance, das Problem zu beheben!',
      forgot_password: 'Passwort vergessen?',
      ups: 'Ups ...',
      reset_password_title: 'Setzen Sie Ihr Passwort zurück',
      reset_password_sub_title: 'Sie erhalten einen Reset-Code an Ihre Firmen-E-Mail',
      code: 'Code',
      sign_in: 'Anmelden',
      sign_up: 'Anmelden',
      get_started: 'Erste Schritte',
      send: 'Senden',
      back: 'Zurück',
      demo: 'Demo?',
      contact_sales: 'Vertrieb kontaktieren',
      first_name: 'Vorname',
      last_name: 'Nachname',
      password: 'Passwort',
      new_password: 'Neues Passwort',
      confirm: 'Passwort bestätigen',
      email: 'Email'
    },
    team: {
      title: 'Teammanagement',
      members: 'Mitglieder',
      name: 'Vorname, Nachname',
      email: 'Email',
      role: 'Rolle',
      created: 'Erstellt',
      last_use: 'Letzte Verwendung',
      invite_text: 'Bitte geben Sie die E-Mail-Adresse des Benutzers für die Einladung ein',
      remove_member: 'Mitglied entfernen',
      search_placeholder: 'Nach Mitglied suchen …'
    }
  },
  esp: {
    header: {
      nav_dashboard: 'Panel',
      nav_list: 'Lista',
      nav_history: 'Historia',
      question: 'Estas seguro(a)?'
    },
    menu: {
      account: 'Cuenta',
      settings: 'Ajustes',
      management: 'Gestión de equipos',
      logout: 'Cerrar sesión'
    },
    buttons: {
      save: 'Ahorrar',
      send: 'Enviar',
      back: 'Atrás',
      delete: 'Borrar',
      ok: 'Bueno',
      yes: 'Sí',
      change_role: 'Cambiar rol',
      invite: 'Invitar',
      invite_member: '+Invitar miembro'
    },
    settings: {
      settings: 'Ajustes',
      language: 'Idioma',
      currency: 'Divisa',
      timezone: 'Zona horaria',
      date_format: 'Formato de fecha'
    },
    profile: {
      first_name: 'Nombre de pila',
      last_name: 'Apellido',
      password: 'Contraseña',
      new_password: 'Nueva contraseña',
      confirm: 'Confirmar Contraseña',
      email: 'Correo electrónico',
      profile: 'Perfil',
      change_password: 'Cambiar la contraseña'
    },
    auth: {
      sign_in_title: 'Bienvenido a Relu',
      sign_in_sub_title: 'Inicia sesión con tu correo electrónico y contraseña corporativos',
      sign_up_sub_email_title: 'Regístrese en Relu usando su correo electrónico corporativo',
      exist_account_text: '¿Ya tienes una cuenta?',
      not_exist_account_text: '¿Aún no tienes una cuenta Relu?',
      sign_up_error_one: 'No tienes acceso a tu cuenta corporativa de Relu. Contacta a tu equipo de administración para este problema.',
      sign_up_error_two: 'Su empresa no utiliza Relu en este momento. ¡Pero tiene la oportunidad de solucionarlo!',
      forgot_password: '¿Olvidaste tu contraseña?',
      ups: 'Ups ...',
      reset_password_title: 'Restablecer contraseña',
      reset_password_sub_title: 'Recibirás un código de reinicio en tu correo electrónico corporativo',
      code: 'Código',
      sign_in: 'Iniciar sesión',
      sign_up: 'Registrarse',
      get_started: 'Comenzar',
      send: 'Enviar',
      back: 'Atras',
      demo: '¿Demostración?',
      contact_sales: 'Contactar con Ventas',
      first_name: 'Nombre de pila',
      last_name: 'Apellido',
      password: 'Contraseña',
      new_password: 'Nueva contraseña',
      confirm: 'Confirmar contraseña',
      email: 'Correo electrónico'
    },
    team: {
      title: 'Gestión de equipos',
      members: 'Miembros',
      name: 'Nombre, Apellido',
      email: 'Correo electrónico',
      role: 'Rol',
      created: 'Creado',
      last_use: 'Último uso',
      invite_text: 'Por favor ingrese el correo electrónico del usuario para la invitación',
      remove_member: 'Eliminar miembro',
      search_placeholder: 'Buscar miembro...'
    }
  }
};

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages
});
