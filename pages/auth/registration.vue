<template>
  <div class="flex flex-col items-center justify-center mt-16">
    <div class="w-full p-4 mx-8 mb-8 md:mx-auto md:w-1/2">
      <div class="flex items-center">
        <div class="relative flex items-center text-gray-800">
          <div
            class="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-gray-800 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bookmark"
            >
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              ></path>
            </svg>
          </div>
          <div
            class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-gray-800 uppercase"
          >
            Personal
          </div>
        </div>
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-800"
        ></div>
        <div class="relative flex items-center text-white">
          <div
            class="w-12 h-12 py-3 transition duration-500 ease-in-out bg-gray-800 border-2 border-gray-800 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-user-plus"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <div
            class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-gray-800 uppercase"
          >
            Account
          </div>
        </div>
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300"
        ></div>
        <div class="relative flex items-center text-gray-500">
          <div
            class="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-gray-300 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-mail"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div
            class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-gray-500 uppercase"
          >
            Message
          </div>
        </div>
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300"
        ></div>
        <div class="relative flex items-center text-gray-500">
          <div
            class="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-gray-300 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-database"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <div
            class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-gray-500 uppercase"
          >
            Confirm
          </div>
        </div>
      </div>
    </div>

    <nuxt-child />
  </div>
</template>

<script>
export default {
  // verified: false,
  // auth: false,
}
</script>
