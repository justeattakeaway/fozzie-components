export default {
    name: 'AppIosItIcon',

    props: {
    },

    functional: true,

    render(h, ctx) {
        const attrs = ctx.data.attrs || {}
        ctx.data.attrs = attrs

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 40" class="ficon ficon-app-ios.it" {...ctx.data}><path fill="#A6A6A6" d="M130.197 40H4.73A4.739 4.739 0 0 1 0 35.267V4.727A4.734 4.734 0 0 1 4.73 0h125.467C132.803 0 135 2.12 135 4.726v30.54c0 2.606-2.197 4.734-4.803 4.734z"></path><path d="M134.032 35.268a3.83 3.83 0 0 1-3.834 3.83H4.728a3.835 3.835 0 0 1-3.838-3.83V4.725A3.84 3.84 0 0 1 4.73.89h125.467c2.12 0 3.834 1.72 3.834 3.835l.01 30.543z"></path><path fill="#FFF" d="M30.133 19.784c-.03-3.223 2.64-4.79 2.76-4.864-1.51-2.203-3.852-2.504-4.675-2.528-1.967-.207-3.875 1.177-4.877 1.177-1.02 0-2.56-1.16-4.22-1.13-2.14.03-4.14 1.27-5.24 3.19-2.26 3.92-.57 9.69 1.6 12.86 1.09 1.55 2.36 3.28 4.02 3.22 1.63-.07 2.23-1.04 4.2-1.04 1.95 0 2.52 1.03 4.21.99 1.74-.03 2.84-1.56 3.89-3.13 1.26-1.78 1.76-3.53 1.78-3.62-.04-.01-3.39-1.29-3.42-5.15zm-3.2-9.478c.874-1.093 1.472-2.58 1.306-4.09-1.27.057-2.85.876-3.76 1.945-.81.95-1.53 2.49-1.34 3.94 1.42.11 2.88-.71 3.79-1.79zM53.65 31.504h-2.272l-1.244-3.91H45.81l-1.185 3.91h-2.21l4.283-13.308h2.646l4.305 13.308zm-3.89-5.55l-1.126-3.474c-.12-.355-.342-1.19-.67-2.507h-.04c-.132.566-.343 1.402-.633 2.507l-1.1 3.475h3.58zm14.906.634c0 1.632-.44 2.922-1.323 3.87-.79.842-1.77 1.263-2.942 1.263-1.26 0-2.17-.45-2.72-1.36h-.04v5.06h-2.13V25.07c0-1.026-.02-2.08-.08-3.16h1.87l.12 1.522h.04c.71-1.15 1.79-1.72 3.24-1.72 1.13 0 2.08.447 2.84 1.34.76.898 1.14 2.076 1.14 3.537zm-2.172.078c0-.934-.21-1.704-.632-2.31-.46-.632-1.08-.948-1.856-.948-.526 0-1.004.176-1.43.523-.43.35-.71.81-.84 1.38-.066.27-.1.48-.1.65v1.6c0 .7.215 1.29.643 1.77s.98.72 1.66.72c.8 0 1.43-.31 1.87-.92.45-.62.67-1.43.67-2.45zm13.21-.078c0 1.632-.44 2.922-1.325 3.87-.79.842-1.77 1.263-2.95 1.263-1.27 0-2.17-.45-2.73-1.36h-.04v5.06h-2.13V25.07c0-1.026-.03-2.08-.08-3.16h1.87l.12 1.522h.04c.71-1.15 1.79-1.72 3.24-1.72 1.13 0 2.07.447 2.83 1.34.75.898 1.13 2.076 1.13 3.537zm-2.173.078c0-.934-.21-1.704-.63-2.31-.46-.632-1.08-.948-1.85-.948-.52 0-1 .176-1.43.523-.42.35-.7.81-.83 1.38-.06.27-.1.48-.1.65v1.6c0 .7.22 1.29.64 1.77.43.48.99.72 1.67.72.81 0 1.43-.31 1.88-.92.45-.62.67-1.43.67-2.45zm14.52 1.106c0 1.132-.39 2.053-1.18 2.764-.86.777-2.07 1.165-3.62 1.165-1.43 0-2.58-.27-3.45-.82l.5-1.77c.94.57 1.97.85 3.09.85.81 0 1.43-.18 1.88-.54.45-.36.67-.84.67-1.45 0-.54-.18-.99-.55-1.36-.36-.37-.98-.71-1.83-1.03-2.33-.87-3.49-2.14-3.49-3.81 0-1.09.41-1.99 1.23-2.69.82-.69 1.9-1.04 3.26-1.04 1.21 0 2.22.21 3.02.63l-.55 1.72c-.75-.4-1.6-.61-2.55-.61-.75 0-1.33.19-1.75.56-.35.33-.53.73-.53 1.21 0 .53.208.96.616 1.31.354.317 1 .66 1.935 1.028 1.145.46 1.986 1 2.527 1.62.53.62.8 1.39.8 2.31zm7.05-4.264h-2.35v4.66c0 1.184.42 1.776 1.25 1.776.38 0 .7-.033.95-.1l.06 1.62c-.42.157-.97.236-1.66.236-.84 0-1.5-.257-1.97-.77-.47-.514-.71-1.376-.71-2.587v-4.837h-1.4v-1.6h1.4V20.15l2.1-.633v2.39h2.35v1.6zm10.6 3.12c0 1.474-.42 2.685-1.26 3.632-.88.975-2.05 1.46-3.51 1.46-1.41 0-2.53-.466-3.36-1.4s-1.26-2.113-1.26-3.534c0-1.487.43-2.705 1.3-3.652.86-.948 2.02-1.422 3.49-1.422 1.41 0 2.54.467 3.4 1.402.82.907 1.23 2.078 1.23 3.513zm-2.21.07c0-.887-.19-1.646-.57-2.28-.44-.766-1.08-1.15-1.91-1.15-.85 0-1.51.385-1.95 1.15-.38.634-.57 1.405-.57 2.317 0 .885.19 1.644.57 2.276.47.77 1.11 1.15 1.94 1.15.82 0 1.46-.39 1.92-1.17.4-.64.6-1.41.6-2.29zm9.15-2.915c-.21-.04-.43-.06-.67-.06-.75 0-1.33.284-1.74.85-.35.5-.53 1.133-.53 1.896v5.03h-2.13l.02-6.58c0-1.11-.03-2.12-.08-3.02h1.86l.08 1.83h.06c.23-.63.58-1.14 1.07-1.52.48-.35.99-.52 1.54-.52.2 0 .38.01.53.04v2.03zm9.54 2.47c0 .38-.02.703-.07.966h-6.4c.03.94.34 1.67.93 2.17.54.44 1.24.67 2.09.67.95 0 1.81-.15 2.59-.46l.34 1.48c-.91.39-1.98.59-3.21.59-1.49 0-2.65-.44-3.5-1.32-.85-.88-1.28-2.05-1.28-3.53 0-1.45.4-2.65 1.19-3.62.83-1.03 1.945-1.54 3.35-1.54 1.38 0 2.43.51 3.14 1.54.565.81.848 1.82.848 3.02zm-2.03-.554c.02-.64-.12-1.18-.41-1.64-.37-.6-.93-.89-1.7-.89-.69 0-1.26.29-1.69.87-.35.46-.56 1.01-.63 1.65h4.44zM47.43 11.6c0 .553-.192 1.01-.58 1.354-.425.38-1.02.572-1.78.572-.703 0-1.27-.137-1.694-.41l.24-.872c.46.27.96.41 1.513.41.39 0 .7-.09.92-.27.22-.18.33-.42.33-.717 0-.266-.09-.49-.28-.67-.18-.18-.48-.35-.9-.505-1.15-.428-1.72-1.053-1.72-1.876 0-.54.2-.98.6-1.32.4-.345.93-.517 1.6-.517.59 0 1.09.1 1.48.31l-.26.85c-.37-.2-.79-.3-1.25-.3-.37 0-.66.09-.87.27-.18.16-.26.36-.26.59 0 .26.1.47.3.64.17.15.49.32.95.5.56.22.97.49 1.24.79.26.31.39.68.39 1.14zm4.967-2.76l-.2.796a2.056 2.056 0 0 0-.913-.195c-.46 0-.822.16-1.09.46-.27.31-.403.7-.403 1.17 0 .5.15.9.43 1.19s.64.43 1.07.43c.33 0 .64-.07.95-.2l.15.79c-.34.17-.77.25-1.3.25-.72 0-1.29-.21-1.71-.65s-.64-1.02-.64-1.75.23-1.33.69-1.8 1.07-.7 1.85-.7c.44 0 .82.07 1.13.22zm4.968 4.59h-.94l-.074-.543h-.03c-.32.432-.78.65-1.37.65-.44 0-.8-.144-1.07-.428a1.37 1.37 0 0 1-.37-.96c0-.58.24-1.02.73-1.32.48-.31 1.16-.46 2.04-.45v-.08c0-.62-.32-.93-.98-.93-.46 0-.87.11-1.23.34l-.21-.69c.44-.27.98-.41 1.62-.41 1.23 0 1.85.65 1.85 1.95v1.74c-.01.47.02.84.06 1.12zm-1.083-1.62v-.727c-1.16-.02-1.74.297-1.74.95 0 .246.066.43.2.553.135.12.306.18.51.18.23 0 .446-.08.643-.22s.316-.33.36-.56a.785.785 0 0 0 .02-.188zm5.34-2.173a1.753 1.753 0 0 0-.33-.03c-.37 0-.65.14-.855.418-.172.24-.26.55-.26.93v2.47h-1.05l.01-3.23c0-.55-.01-1.04-.036-1.49h.9l.04.9h.03c.11-.31.29-.56.52-.747.24-.17.49-.25.76-.25.1 0 .19.003.26.02v.995zm2.5-2.33c0 .19-.062.34-.184.457a.66.66 0 0 1-.476.175.59.59 0 0 1-.44-.18c-.12-.12-.18-.27-.18-.45s.06-.33.183-.45.275-.18.457-.18c.18 0 .33.06.454.17.12.11.183.26.183.44zm-.12 6.12h-1.047V8.72H64v4.713zm5.23-4.586l-.203.8c-.27-.13-.57-.19-.92-.19-.46 0-.83.16-1.09.46-.26.31-.4.7-.4 1.17 0 .5.14.9.42 1.19s.64.43 1.08.43c.32 0 .64-.07.95-.2l.15.79c-.35.17-.78.25-1.3.25-.72 0-1.29-.21-1.72-.65s-.64-1.02-.64-1.75.23-1.33.69-1.8 1.08-.7 1.85-.7c.44 0 .82.076 1.13.22zm4.964 4.59h-.94l-.077-.54h-.03c-.33.43-.79.65-1.38.65-.45 0-.81-.14-1.08-.43-.25-.26-.37-.58-.37-.96 0-.58.24-1.01.72-1.32.48-.3 1.15-.45 2.03-.44v-.08c0-.62-.33-.93-.98-.93-.47 0-.88.12-1.23.35l-.22-.68c.43-.27.97-.4 1.61-.4 1.23 0 1.85.65 1.85 1.95v1.74c0 .47.02.84.06 1.12zm-1.086-1.62v-.72c-1.16-.02-1.737.3-1.737.95 0 .25.07.43.21.56.14.12.31.18.51.18.23 0 .45-.08.65-.22a.891.891 0 0 0 .36-.56c.016-.05.02-.11.02-.19zm8.564.27c0 .44-.16.79-.484 1.06-.322.27-.77.4-1.338.4-.537 0-.992-.1-1.367-.32l.223-.77c.36.22.746.33 1.154.33.537 0 .805-.19.805-.59 0-.17-.06-.32-.174-.43-.11-.11-.32-.22-.62-.33-.84-.31-1.26-.76-1.26-1.36 0-.4.16-.74.47-1.02.31-.27.73-.4 1.23-.4.47 0 .87.1 1.2.29l-.222.75c-.3-.18-.62-.27-.96-.27-.22 0-.39.05-.51.16s-.18.23-.18.4.07.295.2.4c.11.09.32.2.64.32.82.31 1.23.78 1.23 1.42zm5.638 1.35h-.923l-.06-.72h-.02c-.33.55-.83.83-1.5.83-.47 0-.84-.14-1.12-.44-.33-.35-.5-.89-.5-1.61V8.72h1.04v2.6c0 .905.31 1.357.93 1.357.46 0 .79-.226.97-.68.04-.115.07-.248.07-.397V8.72h1.04v3.355c0 .446.01.9.04 1.358z"></path></svg>
    }
}