export type Dictionary = typeof portugueseDictionary;

export const portugueseDictionary = {
  estimativeForm: {
    originAddress: "Endereço de origem",
    destinationAddress: "Endereço de destino",
    userId: "ID do usuário",
    title: "Solicitar viagem",
    calculate: "Solicitar",
    placeholders: {
      originAddress: "Digite o endereço de origem",
      destinationAddress: "Digite o endereço de destino",
      userId: "Digite o ID do usuário",
    },
    errors: {
      userId: "ID do usuário é obrigatório",
      originAddress: "Endereço de origem é obrigatório",
      destinationAddress: "Endereço de destino é obrigatório",
      invalidAddress: "Endereço de destino ou origem inválido",
    },
  },
  trip: {
    estimation: {
      title: "Estimativa de Viagem",
      distance: "Distância",
      duration: "Duração",
      chooseDriver: "Escolher Motorista",
      drivers: "Motoristas disponíveis",
      confirmTrip: "Erro ao confirmar viagem",
    },
    history: {
      date: "Data e Hora",
      driver: "Motorista",
      origin: "Origem",
      destination: "Destino",
      duration: "Duração",
      value: "Valor",
      applyFilter: "Aplicar Filtro",
      title: "Histórico de Viagens",
      distance: "Distância",
      select: {
        all: "Todos os Motoristas",
      },
    },
  },
  signIn: {
    errors: {
      email: "Email é obrigatório",
      password: "Senha é obrigatória",
      invalidCredentials: "Credenciais inválidas",
    },
    title: "Login",
    email: "Email",
    password: "Senha",
    button: "Entrar",
    haveNoAccount: "Não tem uma conta?",
    placeholders: {
      email: "Digite seu email",
      password: "Digite sua senha",
    },
  },
  signUp: {
    errors: {
      email: "Email é obrigatório",
      password: "Senha é obrigatória",
      name: "Nome é obrigatório",
      userAlreadyExists: "Usuário já existe",
    },
    title: "Cadastro",
    email: "Email",
    password: "Senha",
    button: "Cadastrar",
    haveAnAccount: "Já possui uma conta?",
    name: "Nome",
    placeholders: {
      email: "Digite seu email",
      password: "Digite sua senha",
      name: "Digite seu nome",
    },
  },
};

export const englishDictionary: Dictionary = {
  estimativeForm: {
    originAddress: "Origin address",
    destinationAddress: "Destination address",
    userId: "User ID",
    title: "Request trip",
    calculate: "Request",
    placeholders: {
      originAddress: "Enter the origin address",
      destinationAddress: "Enter the destination address",
      userId: "Enter the user ID",
    },
    errors: {
      userId: "User ID is required",
      originAddress: "Origin address is required",
      destinationAddress: "Destination address is required",
      invalidAddress: "Invalid destination or origin address",
    },
  },
  trip: {
    estimation: {
      title: "Trip Estimation",
      distance: "Distance",
      duration: "Duration",
      chooseDriver: "Choose Driver",
      drivers: "Drivers available",
      confirmTrip: "Error confirming trip",
    },
    history: {
      date: "Date and Time",
      driver: "Driver",
      origin: "Origin",
      destination: "Destination",
      duration: "Duration",
      value: "Value",
      applyFilter: "Apply Filter",
      title: "Trip History",
      distance: "Distance",
      select: {
        all: "All Drivers",
      },
    },
  },
  signIn: {
    errors: {
      email: "Email is required",
      password: "Password is required",
      invalidCredentials: "Invalid credentials",
    },
    title: "Login",
    email: "Email",
    password: "Password",
    button: "Sign in",
    haveNoAccount: "Don't have an account?",
    placeholders: {
      email: "Enter your email",
      password: "Enter your password",
    },
  },
  signUp: {
    errors: {
      email: "Email is required",
      password: "Password is required",
      name: "Name is required",
      userAlreadyExists: "User already exists",
    },
    title: "Sign up",
    email: "Email",
    name: "Name",
    password: "Password",
    button: "Sign up",
    haveAnAccount: "Already have an account?",
    placeholders: {
      email: "Enter your email",
      password: "Enter your password",
      name: "Enter your name",
    },
  },
};
