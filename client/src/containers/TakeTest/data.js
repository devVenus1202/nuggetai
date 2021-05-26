/* eslint-disable react/display-name */
import * as React from 'react';
import { PropTypes } from 'prop-types';
import correlationTableEn from '../../images/challenges/correlation-table.png';
import multipleRegressionTableEn from '../../images/challenges/multiple-regression-table.png';
import customerDemographics from '../../images/challenges/customer-demographics.png';
import customerSatisfactionSurvey from '../../images/challenges/customer-satisfaction-survey.png';
import performanceManagementResults from '../../images/challenges/performance-management-results.png';
import profitsChart from '../../images/challenges/profits-chart.png';
import consultingChart from '../../images/challenges/consulting-resource-2.png';
import crisisTable from '../../images/challenges/crisis-table.png';

export const testdata = {
  keyword: [
    'Google',
    'customer service',
    'digital assistant',
    'customer',
    'user experience',
    'voice',
    'voice technology',
  ],

  title: 'Challenge Instructions: Digital Assistants',

  desc:
    'Digital assistant devices have recently been introduced in the market and consumers are unfamiliar with their actual function. You’ve been hired as a Customer Success Specialist for Google to help customers identify the benefits of purchasing a Google Assistant through voice. Communicate a strong value proposition to the right audience. Remember to record your answers appropriately in each of the four containers. Identify the problem, collect important information from the article, brainstorm ideas and alternatives, and recommend a final solution in 3-5 sentences. You can use jot notes or write full sentences.',

  res: [
    {
      name: 'Use Case: GE Appliances',
      desc: (lang, comp) => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">{comp.context.t('usecase-one')}</p>
              <p>{comp.context.t('usecase-two')}</p>
              <p>{comp.context.t('usecase-three')}.</p>
              <p>{comp.context.t('usecase-four')}.</p>
              <p>{comp.context.t('usecase-five')}</p>
              <p>{comp.context.t('usecase-six')}.</p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'What is Google Assistant?',
      desc:
        "Google Assistant is Google's voice-controlled smart assistant. It's was" +
        ' originally an upgrade or extension of Google Now - designed to be personal -' +
        " while expanding on Google's existing 'OK Google' voice controls." +
        '\n' +
        'Originally, Google Now smartly pulled out relevant information for you: it knew' +
        ' where you work, and it knew your meeting locations and travel plans, the sports' +
        ' teams you liked, and what interested you so that Now could present you with' +
        ' personal information that mattered. Google has long killed the Google Now' +
        ' brand, but Assistant very much lives in the same space, but fuses these personalised' +
        ' elements with a wide-range of voice control' +
        '\n' +
        "The 'OK Google' or 'Hey, Google' side" +
        ' covers voice commands, voice searching,' +
        ' and voice-activated device control, letting' +
        ' you do things like send messages, check' +
        ' appointments and so on on your Android' +
        " device, just like Apple's Siri on an iPhone" +
        ' or iPad, but reaching far beyond that, with' +
        ' a bot-centric AI experience, designed to' +
        ' give you conversational interactions.' +
        '\n' +
        'Continued Conversation that means you' +
        " don't have to say 'Hey Google' for" +
        ' follow-up requests. Google Assistant will' +
        " also work out when you're talking to it" +
        ' versus other people in the room.' +
        '\n' +
        'Multiple Actions is also a new capability' +
        ' that enables you to ask for multiple things' +
        ' at the same time. This, says Google, is' +
        ' rather difficult - in linguistics it is called' +
        ' coordination reduction. Mastering' +
        ' requests like this is probably what will' +
        ' power Google Assistant ahead of rivals.' +
        '\n' +
        'Also, a new Pretty Please mode for Google' +
        ' Assistant will help ensure everyone in' +
        " your household is saying 'please' and" +
        " 'thank you'. When enabled, it responds" +
        ' positively when you say either of those' +
        ' phrases.' +
        '\n' +
        'Pretty Please can be enabled for specific' +
        ' members of your household, so you can' +
        ' encourage your kids to be polite, or you' +
        ' can just play a trick on your spouse as' +
        " they're setting a timer for dinner without" +
        ' their manners.' +
        '\n' +
        'Because Google Assistant knows you and' +
        ' understands context, it can react in an' +
        " informed or smart way. That's important" +
        ' as Assistant spreads its wings, because it' +
        ' gives voice control a lot more power and' +
        ' moves it on from only reacting to specific' +
        ' phrases or commands.' +
        '\n' +
        'In the future, Google even says that' +
        ' Assistant will be able to call and book' +
        ' appointments for you.',
    },
  ],
};

export const pitchIdea = {
  keyword: [
    'music',
    'lyrics',
    'artist',
    'creative industries',
    'song proposal',
    'voice',
  ],

  title: 'blue-sky-music-proposal',

  desc: 'blue-sky-music-proposal-description',

  res: [
    {
      name: 'blue-sky-music-proposal-resource-1',
      desc: (lang, comp) => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">
                <i>{comp.context.t('note')}.</i>
              </p>
              <br />
              <p className="m-1">
                <b>{comp.context.t('song-title')}:</b>{' '}
                {comp.context.t('true-colours')}
              </p>
              <p className="m-1">
                <b>{comp.context.t('artist')}:</b> {comp.context.t('unnamed')}
              </p>
              <p className="m-1">
                <b>{comp.context.t('instrumentals')}:</b>{' '}
                {comp.context.t('no-decription-provided')}
              </p>
              <p className="m-1">
                <b>{comp.context.t('vocal-type')}:</b>{' '}
                {comp.context.t('single-vocal-male')}
              </p>
              <p className="m-1">
                <b>{comp.context.t('theme-song')}:</b>{' '}
                {comp.context.t('love-relationships')}
              </p>
              <p className="m-1">
                <b>{comp.context.t('storyline-song')}:</b>{' '}
                {comp.context.t('storyline-song-description')}
              </p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <p id="tour-selection">
                <i>
                  Nota: estos recursos son documentos proporcionados por
                  adelantado a todos los asistentes a la reunión. Con estos
                  recursos, a los asistentes se les presenta la letra de una
                  canción seleccionada al azar de la lista de la etiqueta.
                  Aparte de la letra, se identifican los elementos generales de
                  la canción. Además, los elementos específicos de la canción
                  están identificados y estos elementos no son necesariamente
                  elementos que los ejecutivos de la etiqueta están buscando,
                  pero deberían darle una idea de qué tipo de información debe
                  tener en cuenta al desarrollar su plan.
                </i>
              </p>
              <br />
              <p className="m-1">
                <b>Título de la canción:</b> Colores verdaderos
              </p>
              <p className="m-1">
                <b>Artista:</b> Sin nombre
              </p>
              <p className="m-1">
                <b>Instrumentales:</b> No se proporciona descripción
              </p>
              <p className="m-1">
                <b>Tipo vocal:</b> Primer sencillo voz masculina
              </p>
              <p className="m-1">
                <b>Tema de la canción:</b> Amor y relaciones
              </p>
              <p className="m-1">
                <b>Línea de la historia de la canción:</b> El cantante está
                expresando a su amante su deseo de conocer y conectar con ella
                en un nivel más profundo. Artísticamente, El cantante utiliza la
                metáfora de los colores y las imágenes para comunicarse. este
                sentimiento a su amante.
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'blue-sky-music-proposal-resource-2',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p>
                <i className="rc">
                  Rhyme scheme (AABCDD for first verse) in red notation
                </i>
                <br />
                [Verse 1]
                <br />
                <span className="rc">A</span> Tell me the truth
                <br />
                <span className="rc">A</span> Baby girl, who else been with you
                <br />
                <span className="rc">B</span> It's gon' come to my attention
                either way, yeah
                <br />
                <span className="rc">C</span> And I understand
                <br />
                <span className="rc">C</span> Baby girl, we all had a past
                <br />
                <span className="rc">D</span> I'd much rather hear the truth
                come straight from you
                <br />
              </p>

              <p>
                <i>
                  <span className="hl">Call</span>
                  -and-
                  <span className="gc">response</span> technique with{' '}
                  <span className="hl">main vocal</span> and{' '}
                  <span className="gc">background vocals</span> highlighted
                </i>
                <br />
                [Pre-Chorus]
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">So if I love you</span>
                <span className="gc"> (If I love you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">It'd be just for you</span>
                <span className="gc"> (It’d be just for you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">So when I'm touching you</span>
                <span className="gc"> (touching you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">Can I trust in you?</span>
                <span className="gc"> (trust in you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">Can I trust in you?</span>
                <span className="gc"> (trust in you) Oh babe</span>
                <br />
              </p>

              <p>
                <i>
                  <b>Standout moment bolded</b>: change in pitch from same part
                  of first verse
                </i>
                <br />
                [Chorus]
                <br />
                Girl, come show me <b>your true colors</b>
                <br />
                Paint me a picture with <b>your true colors</b>
                <br />
                These are the questions <b>of a new lover</b>
                <br />
                True colors, true colors
                <br />
                Girl, come show me <b>your true colors</b>
                <br />
                Paint me a picture with <b>your true colors</b>
                <br />
                These are confessions <b>of a new lover</b>
                <br />
                True colors, true colors
                <br />
              </p>

              <p>
                <b>Partial in-line repetition bolded</b>
                <br />
                [Verse 2]
                <br />
                <span className="rc">A</span> What's done is done
                <br />
                <span className="rc">A</span> Now that I'm the only one
                <br />
                <span className="rc">B</span> If you tell me I'll accept what
                you've been through, oh yeah
                <br />
                <span className="rc">C</span> And I don't believe
                <br />
                <span className="rc">C</span> All this inconsistency
                <br />
                <span className="rc">D</span>{' '}
                <b>I've been hearing different stories about you</b>
                <br />
              </p>

              <p>
                <i>
                  <span className="hl">Call</span>
                  -and-
                  <span className="gc">response</span> technique with{' '}
                  <span className="hl">main vocal</span> and{' '}
                  <span className="gc">background vocals</span> highlighted
                </i>
                <br />
                [Pre-Chorus]
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">So if I love you</span>
                <span className="gc"> (If I love you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">It'd be just for you</span>
                <span className="gc"> (It’d be just for you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">So when I'm touching you</span>
                <span className="gc"> (touching you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">Can I trust in you?</span>
                <span className="gc"> (trust in you)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">Can I trust in you?</span>
                <span className="gc"> (trust in you) Oh babe</span>
                <br />
              </p>

              <p>
                <i>Standout instruments and effects throughout the Bridge:</i>
              </p>
              <p>
                <i>Drum pattern distinct from other parts of song</i>
              </p>

              <p>
                <b>Partial in-line repetition bolded</b>
                <br />
                <i>
                  Outro is a mostly vocal version of chorus, with muted
                  instruments and slower pace.{' '}
                </i>
                <br />
              </p>

              <p>
                [Chorus]
                <br />
                Girl, come show me <b>your true colors</b>
                <br />
                Paint me a picture with <b>your true colors</b>
                <br />
                These are the questions <b>of a new lover</b>
                <br />
                True colors, true colors
                <br />
                Girl, come show me <b>your true colors</b>
                <br />
                Paint me a picture with <b>your true colors</b>
                <br />
                These are confessions <b>of a new lover</b>
                <br />
                True colors, true colors
                <br />
              </p>
              <p>
                [Bridge]
                <br />
                Baby, show me you're a keeper
                <br />
                It's been hard for me to keep up
                <br />
                You've been tryna keep me in the dark
                <br />
                But baby girl, I see you
                <br />
                <span className="hl">Baby, show me you're a keeper</span>{' '}
                <span className="gc">(show me you’re a keeper)</span>
                <br />
                <span className="hl">
                  It's been hard for me to keep up
                </span>{' '}
                <span className="gc">(hard for me to keep up)</span>
                <br />
                You've been tryna keep me in the dark
                <br />
                But baby girl, I see you
                <br />
              </p>
              <p>
                [Outro/Chorus]
                <br />
                Girl, come show me <b>your true colors</b>
                <br />
                Paint me a picture with <b>your true colors</b>
                <br />
                These are the questions <b>of a new lover</b>
                <br />
                True colors, true colors
                <br />
                Girl, come show me <b>your true colors</b>
                <br />
                Paint me a picture with <b>your true colors</b>
                <br />
                These are confessions <b>of a new lover</b>
                <br />
                True colors, true colors
                <br />
              </p>
            </div>
          );
        }
        if (lang === 'es') {
          return (
            <div>
              <p>
                <i className="rc">
                  Esquema de rimas (AABCDD para el primer verso) en notación
                  roja
                </i>
                <br />
                [Verso 1]
                <br />
                <span className="rc">A</span> Dime la verdad
                <br />
                <span className="rc">A</span> Nena, quien más ha estado contigo
                <br />
                <span className="rc">B</span> Se fue llama mi atención, sí
                <br />
                <span className="rc">C</span> Y yo entiendo
                <br />
                <span className="rc">C</span> Niña, todos tuvimos un pasado.
                <br />
                <span className="rc">D</span> Prefiero escuchar la verdad venir
                directamente de ti
                <br />
              </p>

              <p>
                <i>
                  <span className="hl">Llamada</span>
                  -y-
                  <span className="gc">respuesta</span> técnica con{' '}
                  <span className="hl">vocal principal</span> y{' '}
                  <span className="gc">voz de fondo</span> resaltado
                </i>
                <br />
                [Pre-Coro]
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">Entonces si te amo</span>
                <span className="gc"> (Si te amo)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">Sería solo para ti</span>
                <span className="gc"> (Sería solo para ti)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">Así que cuando te estoy tocando</span>
                <span className="gc"> (tocándote)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">¿Puedo confiar en ti?</span>
                <span className="gc"> (confio en ti)</span>
                <br />
                <span className="rc">A</span>{' '}
                <span className="hl">¿Puedo confiar en ti?</span>
                <span className="gc"> (confio en ti) Oh bebé</span>
                <br />
              </p>

              <p>
                <i>
                  <b>Momento destacado en negrita</b>: cambio en el tono de la
                  misma parte del verso
                </i>
                <br />
                [Coro]
                <br />
                Chica, ven a mostrarme <b> tus verdaderos colores </b>
                <br />
                Píntame una foto con <b> tus verdaderos colores </b>
                <br />
                Estas son las preguntas <b> de un nuevo amante </b>
                <br />
                Colores verdaderos, colores verdaderos
                <br />
                Chica, ven a mostrarme <b> tus verdaderos colores </b>
                <br />
                Píntame una foto con <b> tus verdaderos colores </b>
                <br />
                Estas son las confesiones <b> de un nuevo amante </b>
                <br />
                Colores verdaderos, colores verdaderos
                <br />
              </p>

              <p>
                <b> Repetición parcial en línea en negrita </b>
                <br />
                [Verso 2]
                <br />
                <span className="rc"> A </span> Lo que está hecho está hecho
                <br />
                <span className="rc"> A </span> Ahora que soy el único
                <br />
                <span className="rc"> B </span> Si me dices, aceptaré lo que has
                , oh si
                <br />
                <span className="rc"> C </span> Y no creo
                <br />
                <span className="rc"> C </span> Todas estas inconsistencias
                <br />
                <span className="rc"> D </span> {''}
                <b> He estado escuchando diferentes historias sobre ti </b>
                <br />
              </p>

              <p>
                <i>
                  <span className="hl"> Llamada </span>
                  -y-
                  <span className="gc"> respuesta </span> técnica con {''}
                  <span className="hl"> vocal principal </span> y {''}
                  <span className="gc"> vocales de fondo </span> resaltadas
                </i>
                <br />
                [Pre coro]
                <br />
                <span className="rc"> A </span> {''}
                <span className="hl"> Así que si te quiero </span>
                <span className="gc"> (Si te quiero) </span>
                <br />
                <span className="rc"> A </span> {''}
                <span className="hl"> Sería solo para ti </span>
                <span className="gc"> (Sería solo para ti) </span>
                <br />
                <span className="rc"> A </span> {''}
                <span className="hl"> Así que cuando te estoy tocando </span>
                <span className="gc"> (tocándote) </span>
                <br />
                <span className="rc"> A </span> {''}
                <span className="hl"> ¿Puedo confiar en ti? </span>
                <span className="gc"> (confía en ti) </span>
                <br />
                <span className="rc"> A </span> {''}
                <span className="hl"> ¿Puedo confiar en ti? </span>
                <span className="gc"> (confía en ti) Oh nena </span>
                <br />
              </p>

              <p>
                <i> Instrumentos y efectos destacados en todo el puente: </i>
              </p>
              <p>
                <i>
                  {' '}
                  Patrón de batería distinto de otras partes de la canción{' '}
                </i>
              </p>

              <p>
                <b> Repetición parcial en línea en negrita </b>
                <br />
                <i>
                  Outro es una versión mayormente vocal de coro, con
                  instrumentos silenciados. un ritmo más lento. {''}
                </i>
                <br />
              </p>

              <p>
                [Coro]
                <br />
                Chica, ven a mostrarme <b> tus verdaderos colores </b>
                <br />
                Píntame una foto con <b> tus verdaderos colores </b>
                <br />
                Estas son las preguntas <b> de un nuevo amante </b>
                <br />
                Colores verdaderos, colores verdaderos
                <br />
                Chica, ven a mostrarme <b> tus verdaderos colores </b>
                <br />
                Píntame una foto con <b> tus verdaderos colores </b>
                <br />
                Estas son las confesiones <b> de un nuevo amante </b>
                <br />
                Colores verdaderos, colores verdaderos
                <br />
              </p>
              <p>
                [Puente]
                <br />
                Bebé, muéstrame que eres un guardián
                <br />
                Me ha sido difícil mantenerse al día
                <br />
                Has estado intentando mantenerme en la oscuridad
                <br />
                Pero niña te veo
                <br />
                <span className="hl">
                  {' '}
                  Cariño, muéstrame que eres un cuidador{' '}
                </span>{' '}
                {''}
                <span className="gc"> (muéstrame que eres un guardián) </span>
                <br />
                <span className="hl"> Me ha costado mucho seguir </span> {''}
                <span className="gc"> (me cuesta mantenerlo) </span>
                <br />
                Has estado intentando mantenerme en la oscuridad
                <br />
                Pero niña te veo
                <br />
              </p>
              <p>
                [Outro/Coro]
                <br />
                Chica, ven a mostrarme <b> tus verdaderos colores </b>
                <br />
                Píntame una foto con <b> tus verdaderos colores </b>
                <br />
                Estas son las preguntas <b> de un nuevo amante </b>
                <br />
                Colores verdaderos, colores verdaderos
                <br />
                Chica, ven a mostrarme <b> tus verdaderos colores </b>
                <br />
                Píntame una foto con <b> tus verdaderos colores </b>
                <br />
                Estas son las confesiones <b> de un nuevo amante </b>
                <br />
                Colores verdaderos, colores verdaderos
                <br />
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
  ],
};

export const communicateValue = {
  keyword: ['real estate', 'sales', 'customer success'],

  title: 'help-a-first-time-homebuyer',

  desc: 'help-a-first-time-homebuyer-description',

  res: [
    {
      name: 'emails',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <h3>
                <b>
                  Email thread - <i>First Email from Client:</i>{' '}
                </b>
              </h3>
              <p>Hello, </p>
              <p>Hope your week is going well.</p>
              <p id="tour-selection">
                I am reaching out today to inquire about working with you on
                purchasing a home. As it is my first time, I am not entirely
                sure how the process works and so below, I discuss some details
                that I think might be relevant to you.{' '}
              </p>
              <p>
                I would be looking for a property suitable for my family. My
                fiancee and I have two kids: a 3 year old and a 1 year old. We
                have lived in Toronto all of our lives and are currently living
                with my fiancee's parents in a townhouse in the west end of
                Toronto, which is convenient because they help take care of the
                kids and our pet hound when they can. My parents help sometimes
                too and they take just one streetcar down to get to the house,
                so it’s convenient for them too. But my fiancee and I both work
                in North York.{' '}
              </p>
              <p>
                We own a car but honestly, for environmental reasons, we prefer
                to take public transit, order Ubers, or even walk whenever we
                can. We don't think we are too picky about the exact location
                (we aren't too sure about what we specifically want just yet) as
                long as the essentials are within short distance. A good park
                nearby where we can take the kids and our pet dog would be great
                too. When it comes to price, we are living pretty comfortably
                and have been pretty good with financial management and think we
                can make most houses within an average price point work. The
                trick is that we are trying to move in as soon as we can because
                our current living situation is becoming rather stressful, as a
                result of the limited space.{' '}
              </p>
              <p>Would you be able to help us find our new home? </p>
              <p>Best,</p>
              <p>Sam</p>
              <br />
              <br />
              <h3>
                <b>
                  <i>Second Email: </i>{' '}
                </b>
              </h3>
              <p>Hi Sam, </p>
              <p>Hope your week is off to a good start. </p>
              <p>
                I’d be able to help figure out some options for you and send
                them your way. I’ll send some forms as well at the same time for
                this to be made more official. Meanwhile, I advise you to start
                looking into getting pre-qualified for mortgage if you haven’t
                already started it. This process will let you know how much
                mortgage you can get. Someone on my team will reach out to you
                shortly with some more information on pre-qualifying for a
                mortgage.{' '}
              </p>
              <p>Best regards, </p>
              <p>Alex </p>
              <br />
              <br />
              <h3>
                <b>
                  <i>Third Email: </i>{' '}
                </b>
              </h3>
              <p>Hi Alex, </p>
              <p>
                Thank you for such a prompt response! That sounds great. We have
                started getting pre-qualified and will let you know asap what
                the results are.{' '}
              </p>
              <p>
                We are looking forward to what you come up with as a best option
                for us.
              </p>
              <p>Cheers,</p>
              <p>Sam</p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <h3>
                <b>
                  Hilo del correo electrónico -{' '}
                  <i> Primer correo electrónico del cliente: </i> {''}
                </b>
              </h3>
              <p> Hola, </p>
              <p> Espero que tu semana vaya bien. </p>
              <p id="tour-selection">
                Hoy me dirijo a usted para informarme sobre cómo trabajar con
                usted para comprar una casa. Como es mi primera vez, no estoy
                completamente seguro de cómo funciona el proceso y, a
                continuación, comento algunos detalles que creo que podrían ser
                relevantes para usted. {''}
              </p>
              <p>
                Yo estaría buscando una propiedad adecuada para mi familia. Mi
                prometida y yo tenemos dos hijos: uno de 3 años y otro de 1 año.
                Hemos vivido en Toronto toda nuestra vida y actualmente estamos
                viviendo con los padres de mi novia en una casa en el extremo
                oeste de Toronto, lo cual es conveniente porque ayudan a cuidar
                a los niños y a nuestro perro mascota cuando pueden. Mis padres
                también ayudan a veces y toman un solo tranvía para llegar a la
                casa, por lo que también es conveniente para ellos. Pero mi
                novia y yo trabajamos en North York. {''}
              </p>
              <p>
                Somos dueños de un automóvil, pero honestamente, por razones
                ambientales, preferimos tomar el transporte público, pedir Ubers
                o incluso caminar cuando podamos. No creemos que seamos
                demasiado exigentes con respecto a la ubicación exacta (todavía
                no estamos muy seguros de lo que queremos específicamente),
                siempre que lo esencial esté a poca distancia. Un buen parque
                cercano donde podamos llevar a los niños y nuestro perro también
                sería genial. Cuando se trata de precios, estamos viviendo
                bastante cómodamente y hemos sido bastante buenos con la
                administración financiera y pensamos que podemos hacer que la
                mayoría de las casas funcionen dentro de un precio promedio. El
                truco es que estamos tratando de movernos lo antes posible
                porque nuestra situación de vida actual se está volviendo
                bastante estresante, como resultado del espacio limitado. {''}
              </p>
              <p> ¿Podrías ayudarnos a encontrar nuestro nuevo hogar? </p>
              <p> Mejor, </p>
              <p> Sam </p>
              <br />
              <br />
              <h3>
                <b>
                  <i> Segundo correo electrónico: </i> {''}
                </b>
              </h3>
              <p> Hola Sam, </p>
              <p> Espero que su semana haya tenido un buen comienzo. </p>
              <p>
                Sería capaz de ayudarlo a descubrir algunas opciones para usted
                y enviarlas a su manera. También enviaré algunos formularios al
                mismo tiempo para que esto se haga más oficial. Mientras tanto,
                te aconsejo que comiences a buscar obtener una precalificación
                para la hipoteca si aún no la has iniciado. Este proceso le
                permitirá saber cuánta hipoteca puede obtener. Alguien de mi
                equipo se comunicará con usted en breve con más información
                sobre la precalificación para una hipoteca. {''}
              </p>
              <p> Saludos cordiales, </p>
              <p> Alex </p>
              <br />
              <br />
              <h3>
                <b>
                  <i> Tercer correo electrónico: </i> {''}
                </b>
              </h3>
              <p> Hola Alex, </p>
              <p>
                ¡Gracias por una pronta respuesta! Eso suena genial. Hemos
                comenzado a obtener la precalificación y le informaremos lo
                antes posible cuáles son los resultados. {''}
              </p>
              <p>
                Esperamos con interés lo que se te ocurra como la mejor opción.
              </p>
              <p> Saludos, </p>
              <p> Sam </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'property-listings-table',
      desc: 'table',
      type: 'dom',
    },
    {
      name: 'find-your-perfect-home',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p>
                Single-family detached homes are the most popular choice of
                Canadian homeowners, but aspiring first-time homebuyers should
                consider all their options before starting their house hunt.
                Don’t overlook the perfect option for your family – you may be
                surprised by what’s out there, at or below your budget.
              </p>
              <p>
                According to <u>Statistics Canada</u>, over half (55%) of
                Canadian households have opted for the classic single-family
                detached house. While condos are a distant second with roughly a
                quarter of homeowners opting for them, they are significantly
                more popular in big metro areas like Toronto and Vancouver.
                Rounding out the homeowner choices at 17.8% of households, are
                other housing options like row houses, semi-detached houses,
                mobile or modular homes, and other single-attached dwellings
                (such as urban infill homes).
              </p>
              <p>
                What starter home is right for you? Read on for a look at the
                most common (and lesser known) home options. Consider all your
                options, so you can maximize your opportunity to find the
                perfect dwelling to call home sweet home.
              </p>
              <br />
              <br />
              <h2>SINGLE FAMILY DETACHED:</h2>
              <p>
                <b>Definition:</b> A single-family, standalone house that sits
                on its own lot
              </p>
              <p>
                <b>Strengths:</b>
              </p>
              <p>
                <ul>
                  <li>Privacy</li>
                  <li>Less noise from neighbours</li>
                  <li>Consistent demand in established neighbourhoods</li>
                </ul>
              </p>
              <p>
                <b>Considerations:</b>
              </p>
              <p>
                <ul>
                  <li>Generally costs more to buy</li>
                  <li>Maintenance costs</li>
                  <li>
                    Highly competitive market in large metro areas, which can
                    include bidding wars and houses selling for well over asking
                    price
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <h2>SINGLE-FAMILY, SEMI-DETACHED:</h2>
              <p>
                <b>Definition:</b> A single-family house attached to another
                house on one side only
              </p>
              <p>
                <b>Strengths:</b>
              </p>
              <p>
                <ul>
                  <li>More affordable to buy than a fully detached home</li>
                  <li>Most of the privacy of a single family detached</li>
                  <li>
                    Can be more affordable to maintain than a fully detached
                    home
                  </li>
                </ul>
              </p>
              <p>
                <b>Considerations:</b>
              </p>
              <p>
                <ul>
                  <li>Less privacy than a detached home</li>
                  <li>Some noise from neighbours through shared wall</li>
                </ul>
              </p>
              <br />
              <br />
              <h2>TOWNHOUSE OR ROWHOUSE:</h2>
              <p>
                <b>Definition:</b> A row of single-family homes, connected on
                both sides to the next home (except for the end units which are
                only connected on one side). All have their own separate yards.
                May be freehold or have condo-style shared ownership rights and
                responsibilities.
              </p>
              <p>
                <b>Strengths:</b>
              </p>
              <p>
                <ul>
                  <li>
                    More affordable to buy than a detached or demi-detached home
                  </li>
                  <li>
                    Can be more affordable to maintain than a fully detached
                    home
                  </li>
                  <li>Private yard</li>
                </ul>
              </p>
              <p>
                <b>Considerations:</b>
              </p>
              <p>
                <ul>
                  <li>Less privacy than a single-family detached home</li>
                  <li>Some noise from neighbours through shared walls</li>
                  <li>
                    Condominium-style ownership include monthly condo
                    fees/maintenance costs.
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <h2>CONDOMINIUM:</h2>
              <p>
                <b>Definition:</b> Low- or high-rise buildings containing many
                apartment units. Units are individually owned, with shared
                ownership rights and responsibilities to the common areas and
                building.
              </p>
              <p>
                <b>Strengths:</b>
              </p>
              <p>
                <ul>
                  <li>Affordable</li>
                  <li>
                    Swimming pool, fitness centre, party room and other shared
                    amenities are standard
                  </li>
                  <li>Minimal maintenance work required</li>
                </ul>
              </p>
              <p>
                <b>Considerations:</b>
              </p>
              <p>
                <ul>
                  <li>
                    Monthly condo/maintenance fees in addition to mortgage
                    payments
                  </li>
                  <li>
                    Less privacy/more noise with neighbours on all sides, plus
                    shared common areas
                  </li>
                  <li>
                    Typically smaller than detached or semi-detached homes
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <p>
                Source
                <br />
                <a href="http://homeownership.ca/house-hunting/finding-the-right-home/find-your-perfect-home-type/">
                  http://homeownership.ca/house-hunting/finding-the-right-home/find-your-perfect-home-type/
                </a>
              </p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <p>
                Las viviendas unifamiliares separadas son la opción más popular
                entre los propietarios de viviendas canadienses, pero los
                compradores de vivienda que aspiran por primera vez deben
                considerar todas sus opciones antes de comenzar su búsqueda de
                vivienda. No pase por alto la opción perfecta para su familia:
                puede que se sorprenda por lo que hay ahí fuera, dentro o por
                debajo de su presupuesto.
              </p>
              <p>
                Según <u> Statistics Canada </u>, más de la mitad (55%) de los
                hogares canadienses han optado por la vivienda unifamiliar
                clásica clásica. Si bien los condominios ocupan un segundo lugar
                con casi un cuarto de los propietarios que optan por ellos, son
                significativamente más populares en grandes áreas metropolitanas
                como Toronto y Vancouver. Completando las opciones de
                propietarios de viviendas en el 17,8% de los hogares, hay otras
                opciones de vivienda como casas adosadas, casas adosadas, casas
                móviles o modulares y otras viviendas unidas (como las casas de
                relleno urbano).
              </p>
              <p>
                ¿Qué casa de inicio es adecuada para ti? Siga leyendo para ver
                las opciones de vivienda más comunes (y menos conocidas).
                Considere todas sus opciones, para que pueda aprovechar al
                máximo la oportunidad de encontrar la vivienda perfecta para
                llamar hogar dulce hogar.
              </p>
              <br />
              <br />
              <h2> UNA SOLA FAMILIA INDEPENDIENTE: </h2>
              <p>
                <b> Definición: </b> Una casa unifamiliar, independiente que se
                encuentra en su propio lote
              </p>
              <p>
                <b> Fortalezas: </b>
              </p>
              <p>
                <ul>
                  <li> Privacidad </li>
                  <li> Menos ruido de los vecinos </li>
                  <li> Demanda consistente en vecindarios establecidos </li>
                </ul>
              </p>
              <p>
                <b> Consideraciones: </b>
              </p>
              <p>
                <ul>
                  <li> Generalmente cuesta más comprar </li>
                  <li> Costos de mantenimiento </li>
                  <li>
                    Mercado altamente competitivo en grandes áreas
                    metropolitanas, que puede incluir guerras de licitación y
                    casas que se venden por un precio muy superior
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <h2> UNIFAMILIAR, SEMIENDIENDO: </h2>
              <p>
                <b> Definición: </b> Una casa unifamiliar adosada a otra casa en
                un solo lado
              </p>
              <p>
                <b> Fortalezas: </b>
              </p>
              <p>
                <ul>
                  <li>
                    {' '}
                    Más asequible para comprar que una casa totalmente separada{' '}
                  </li>
                  <li>
                    {' '}
                    La mayor parte de la privacidad de una sola familia separada{' '}
                  </li>
                  <li>
                    Puede ser más asequible de mantener que un hogar totalmente
                    separado
                  </li>
                </ul>
              </p>
              <p>
                <b> Consideraciones: </b>
              </p>
              <p>
                <ul>
                  <li> Menos privacidad que un hogar separado </li>
                  <li>
                    {' '}
                    Un poco de ruido de los vecinos a través de la pared
                    compartida{' '}
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <h2> ADOSADO O ROWHOUSE: </h2>
              <p>
                <b> Definición: </b> Una fila de casas unifamiliares, conectadas
                en ambos lados a la siguiente casa (excepto las unidades finales
                que solo están conectadas en un lado). Todos tienen sus propios
                patios separados. Puede ser de propiedad absoluta o tener
                derechos y responsabilidades de propiedad compartida de estilo
                condominio.
              </p>
              <p>
                <b> Fortalezas: </b>
              </p>
              <p>
                <ul>
                  <li>
                    Más asequible para comprar que una vivienda unifamiliar o
                    adosada
                  </li>
                  <li>
                    Puede ser más asequible de mantener que un hogar totalmente
                    separado
                  </li>
                  <li> patio privado </li>
                </ul>
              </p>
              <p>
                <b> Consideraciones: </b>
              </p>
              <p>
                <ul>
                  <li>
                    {' '}
                    Menos privacidad que una vivienda unifamiliar aislada{' '}
                  </li>
                  <li>
                    {' '}
                    Algunos ruidos de vecinos a través de paredes compartidas{' '}
                  </li>
                  <li>
                    La propiedad estilo condominio incluye cuotas mensuales de
                    condominio/costos de mantenimiento.
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <h2> CONDOMINIO: </h2>
              <p>
                <b> Definición: </b> Edificios de baja o gran altura que
                contienen muchas unidades de apartamentos. Las unidades son de
                propiedad individual, con derechos de propiedad compartidos y
                responsabilidades para las áreas comunes y el edificio.
              </p>
              <p>
                <b>Fortalezas:</b>
              </p>
              <p>
                <ul>
                  <li>Asequible</li>
                  <li>
                    La piscina, el gimnasio, la sala de fiestas y otros
                    servicios compartidos son estándar
                  </li>
                  <li>Mínimo trabajo de mantenimiento requerido</li>
                </ul>
              </p>
              <p>
                <b>Consideraciones:</b>
              </p>
              <p>
                <ul>
                  <li>
                    Cuotas mensuales de condominio/mantenimiento además de los
                    pagos de la hipoteca
                  </li>
                  <li>
                    Menos privacidad / más ruido con vecinos en todos los lados,
                    además de áreas comunes compartidas
                  </li>
                  <li>
                    Típicamente más pequeño que las casas separadas o adosadas
                  </li>
                </ul>
              </p>
              <br />
              <br />
              <p>
                Fuente
                <br />
                <a href="http://homeownership.ca/house-hunting/finding-the-right-home/find-your-perfect-home-type/">
                  http://homeownership.ca/house-hunting/finding-the-right-home/find-your-perfect-home-type/
                </a>
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
  ],
};

export const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

export const dataScientist = {
  keyword: ['regression', 'data analysis', 'data mining'],

  title: 'data-science',

  desc: 'data-science-description',

  res: [
    {
      name: 'interview-findings',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <h3>
                <b>
                  Ten employees were asked to participate in interviews about
                  their work experiences. Here are several snippets:
                </b>
              </h3>
              <p id="tour-selection">
                “I feel overburdened by my work sometimes. I rarely feel like I
                have a handle on my own tasks and in the off chance that I do
                feel this way, it seems like I’m handed more things to do. I’m
                just constantly stressed out.”{' '}
              </p>
              <p>
                “It’s not bad around here. It really isn’t! I mean, do we have
                meetings all the time? Do I feel like I’m constantly replying to
                emails and my time is sucked up doing these things? Absolutely.
                Am I overly upset about how things are around here? No. Like
                work is work. Work is hard.”{' '}
              </p>
              <p>
                “The one thing I wish for? Work-life balance. I had my first
                child 2 years ago and I have yet to find the sweet balance
                between being a dad and being a manager. Whenever I spend time
                with my daughter, I feel guilty for being away from my work. And
                when I am at work, I feel guilty for being away from my
                daughter. I’m in pursuit of that middle ground.”{' '}
              </p>
              <p>
                “I like to be on my own. I like to do work on my own. I don’t
                really like to mingle, I get straight to business. And I’m
                satisfied that I get the opportunity to do that around here.
                People don’t really bother me, I don’t bother them. I can be in
                and out without speaking to others. It seems to me that many
                others are the same way.”{' '}
              </p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <h3>
                <b>
                  Se pidió a diez empleados que participaran en entrevistas
                  sobre sus experiencias de trabajo. Aquí hay varios fragmentos:
                </b>
              </h3>
              <p id="tour-selection">
                “A veces me siento sobrecargado por mi trabajo. Raramente siento
                que tengo un manejo de mis propias tareas y en la remota
                posibilidad de que me sienta de esta manera, parece que me han
                dado más cosas que hacer. Estoy estresado constantemente.” {''}{' '}
              </p>
              <p>
                {' '}
                “No está mal por aquí. Realmente no lo es! Quiero decir,
                ¿tenemos reuniones todo el tiempo? ¿Siento que estoy
                respondiendo constantemente a los correos electrónicos y mi
                tiempo se ha agotado al hacer estas cosas? Absolutamente. ¿Estoy
                demasiado molesto por cómo están las cosas por aquí? No. el
                trabajo es el trabajo. El trabajo es duro”.{''}{' '}
              </p>
              <p>
                “La única cosa que deseo? Equilibrio trabajo-vida. Tuve mi
                primer hijo hace 2 años y Todavía tengo que encontrar el dulce
                equilibrio entre ser padre y ser gerente. Cada vez que paso
                tiempo con mi hija, me siento culpable por estar lejos de mi
                trabajo. Y cuando estoy en el trabajo, me siento culpable por
                estar lejos de mi hija. Estoy en busca de ese punto medio”. {''}
              </p>
              <p>
                “Me gusta estar por mi cuenta. Me gusta trabajar por mi cuenta.
                Realmente no me gusta mezclarme, Me dirijo directamente a los
                negocios. Y estoy satisfecho de tener la oportunidad de hacerlo
                por aquí. La gente realmente no me molesta, yo no los molesto.
                Puedo entrar y salir sin hablar con los demás. Me parece que
                muchos otros son de la misma manera”. {''}
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'correlation-table',
      desc: () => (
        <div>
          <p className="table-img">
            <img src={correlationTableEn} alt="customer-demographics" />
          </p>
        </div>
      ),
      type: 'dom',
    },
    {
      name: 'multiple-regression-table',
      desc: () => (
        <div>
          <p className="table-img">
            <img src={multipleRegressionTableEn} alt="customer-demographics" />
          </p>
        </div>
      ),
      type: 'dom',
    },
  ],
};

export const b2b = {
  keyword: ['B2B', 'sales', 'software', 'customer', 'experience'],

  title: 'business-to-business-sales',

  desc: 'business-to-business-sales-description',

  res: [
    {
      name: 'email-thread-between',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <h3>
                <b>First email:</b>
              </h3>
              <p id="tour-selection">Hello! </p>
              <p>
                I am reaching out today to inquire about your website services.{' '}
              </p>
              <p>
                I am the owner of a fitness retailer business that has remained
                local in reach for the last 5 years. We have always specialized
                in space-saving equipment and, even though we sell all kinds of
                other equipment too, we have found success with this specialty.{' '}
              </p>
              <p>
                With the recent development of condos in the city, we have been
                more successful than ever. The demand for space-saving equipment
                has increased substantially. We have been fortunate to have only
                a few competitors in the city but we are concerned that with the
                city's commercial development plans, that there might be more
                competitors within this space soon.{' '}
              </p>
              <p>
                In anticipation of this, I am seeking web development services
                from you. We currently have a Facebook page and Instagram
                account devoted to advertising our store, our monthly events,
                and special deals and promotions. We have a pretty active (local
                but active) following on these social media accounts. We had a
                very basic website up until 3 years ago but we found it
                difficult to maintain.
              </p>
              <p>Best,</p>
              <p>Mel</p>
              <h3>
                <b>Second Email:</b>
              </h3>
              <p>Hi Taylor,</p>
              <p>
                Please see email below from a prospective client. A fitness
                retailer looking for us to develop and design their website. I
                have gotten in contact with them (seems promising!) and let them
                know that you as our top sales representative will get in touch
                with them soon with your thoughts on their best option.{' '}
              </p>
              <p>See you later at the meeting! </p>
              <p>Cheers,</p>
              <p>Jen</p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <h3>
                <b>Primer correo:</b>
              </h3>
              <p id="tour-selection">Hello! </p>
              <p>
                Me dirijo hoy para preguntar sobre los servicios de su sitio
                web.{' '}
              </p>
              <p>
                Soy el propietario de un negocio minorista de acondicionamiento
                físico que ha mantenido un alcance local durante los últimos 5
                años Siempre nos hemos especializado en equipos que ahorran
                espacio y, aunque también vendemos todo tipo de otros equipos,
                hemos tenido éxito con esta especialidad.
              </p>
              <p>
                Con el reciente desarrollo de condominios en la ciudad, hemos
                tenido más éxito que nunca La demanda de equipos de ahorro de
                espacio ha aumentado sustancialmente Hemos tenido la suerte de
                tener solo unos pocos competidores en la ciudad, pero nos
                preocupa que con los planes de desarrollo comercial de la
                ciudad, que podría haber más competidores dentro de este espacio
                pronto.{' '}
              </p>
              <p>
                En anticipación a esto, estoy buscando servicios de desarrollo
                web de usted. Actualmente tenemos una página de Facebook y una
                cuenta de Instagram dedicada a anunciar nuestra tienda, nuestros
                eventos mensuales, y ofertas especiales y promociones. Tenemos
                un seguimiento bastante activo (local pero activo) en Estas
                cuentas de redes sociales. Teníamos un sitio web muy básico
                hasta hace 3 años pero encontramos Es difícil de mantener.
              </p>
              <p>Best,</p>
              <p>Mel</p>
              <h3>
                <b>Segundo Correo:</b>
              </h3>
              <p>Hola Taylor,</p>
              <p>
                Por favor, consulte el correo electrónico a continuación de un
                posible cliente. Un minorista de fitness que nos busca
                desarrollar. y diseñar su sitio web. Me puse en contacto con
                ellos (¡parece prometedor!) Y les dejo sepa que usted, como
                nuestro principal representante de ventas, se pondrá en contacto
                con ellos pronto con su Pensamientos sobre su mejor opción.
              </p>
              <p>¡Te veo luego en la reunión!</p>
              <p>Cheers,</p>
              <p>Jen</p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'descriptions-services-provided',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">
                <b>Service 1:</b> Customized Content Management System:
                Bilingual customized solution to updating services, managing
                content, and maintaining the platform
              </p>
              <p>
                <b>Service 2:</b> Drupal: Build website using Drupal for a more
                secure, robust, enterprise level CMS{' '}
              </p>
              <p>
                <b>Service 3:</b> Frameworks: PHP frameworks
              </p>
              <p>
                <b>Service 4:</b> WordPress: Build website using WordPress
              </p>
              <p>
                <b>Service 5:</b> E-Commerce: Launch an online store with
                easy-to-use user interfaces, good pages load time, and smooth
                check out{' '}
              </p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <p id="tour-selection">
                <b>Servicio 1:</b> Sistema de gestión de contenido
                personalizado: solución bilingüe personalizada para actualizar
                servicios, administrar contenido y mantener la plataforma
              </p>
              <p>
                <b>Servicio 2:</b> Drupal: cree un sitio web con Drupal para un
                CMS de nivel empresarial más seguro y sólido{' '}
              </p>
              <p>
                <b>Servicio 3:</b> Frameworks: PHP frameworks
              </p>
              <p>
                <b>Servicio 4:</b> WordPress: Construya un sitio web utilizando
                WordPress
              </p>
              <p>
                <b>Servicio 5:</b> E-Commerce: Abra una tienda en línea con
                interfaces de usuario fáciles de usar, buen tiempo de carga de
                las páginas y un registro sin problemas{' '}
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'actionablet-tips-closing',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">
                <b>1. Start pitching outcomes, not products</b>
              </p>
              <p>
                It can be hard enough to get an audience with a decision maker.
                When you do, don’t frustrate them by burying the lead. Rather
                than wading through all of the details and features of what you
                are selling, give them a clear picture of how they will benefit.
              </p>
              <p>
                Theodore Levitt put it succinctly, “People don’t want to buy a
                quarter inch drill. They want a quarter inch hole.”
              </p>
              <p>
                When you approach a new client, come to them with specific
                numbers in mind. For example:
              </p>
              <p>
                <ul>
                  <li>
                    We can save you twelve hours per week on accounting and
                    administrative costs.
                  </li>
                  <li>
                    Our safety equipment is rated to last two years longer than
                    the most popular on the market.
                  </li>
                  <li>
                    Your sales people will spend 15% less time tracking leads.
                  </li>
                </ul>
              </p>
              <p>
                Of course, your claims are only as good as your evidence. Bring
                along case studies and examples.
              </p>
              <p>
                <b>2. Research potential clients to identify their problems</b>
              </p>
              <p>
                What is your prospective client working on right now? What did
                they struggle with last quarter or last year? How much are their
                problems costing them? If you know the answers to these
                questions, not only can you better pitch the outcomes mentioned
                above, you can plan your entire approach.
              </p>
              <p>
                Here are a few steps that you can take to stay on top of what
                your prospects are facing:
              </p>
              <p>
                <ul>
                  <li>
                    Set up Google Alerts to stay on top of news about your
                    prospects.
                  </li>
                  <li>
                    Read their press releases and quarterly financial reports.
                  </li>
                  <li>
                    Check their website for information on new projects and
                    partnerships.
                  </li>
                  <li>
                    Read reviews on websites such as Glassdoor. Anonymous
                    reviews from current and former employees can reveal areas
                    where a company is struggling.
                  </li>
                </ul>
              </p>
              <p>
                <b>Never forget the power of making contact in person</b>
              </p>
              <p>
                This is one area where older, more seasoned sales staff can
                mentor millennials. While electronic communication, which
                millennials tend to prefer, is certainly more convenient, there
                is just no substitute for meeting with a potential client in
                person. In fact, even face-to-face cold-calling can be effective
                when compared to telephone cold calling.
              </p>
              <p>
                This is especially true when your clients are small, local,
                owner-operated businesses. Even when these initial meetings
                don’t result in a sale, they offer a great opportunity to reach
                out to businesses in your community. When it comes to local B2B
                sales, recognition and community are both exceptionally
                valuable.
              </p>
              <p>
                <b>Offer varied pricing strategies</b>
              </p>
              <p>
                If you approach clients with only one pricing structure, you
                could be sunk before you start. Remember that there are so many
                factors that impact a business prospect’s preferences when it
                comes to paying for your products and services. These include,
                but aren’t limited to cash flow and a desire to test-drive their
                new relationship with your company before making a big
                commitment. Salespeople should come to meetings with several
                pricing options. This allows prospects to pick the one that
                works best for them.
              </p>
              <p>
                For example, if you’re offering gardening services, you could
                offer a discounted price for upfront payment, a slightly higher
                price for payments stretched over six months, and a third option
                for payments stretched over a year. You can also offer tiered
                support as well.
              </p>
              <p>
                <b>Don’t lower your prices to get a sale</b>
              </p>
              <p>
                It doesn’t do much good to close low value sales. This is often
                what happens when salespeople lower prices below valuation in
                order to close a sale. Time is much better spent on clients who
                can afford your base price, and who have the potential to grow
                into your higher tiered offerings.
              </p>
              <p>
                If you don’t have many of such clients, you’re probably not
                getting enough quality leads. You can work on generating more
                leads from Google, social media or cut to the chase by turning
                to sales tools. You can use a lead generation tool like Bant.io
                and a CRM tool like Salesforce to get and nurture hot leads.
              </p>
              <p>
                In no time, you can start having enough clients who can afford
                what you charge. Remember that not every sale is equal. Your
                clients are going to be discerning when they determine whether
                or not to buy your services. It is perfectly reasonable that you
                are discerning as well.
              </p>
              <p>
                These tips are simple and actionable. Not only do they work,
                they make sense. Given that millennials are more likely to go
                along with policies that are reasonable, that’s a win for all
                involved.
              </p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <p id="tour-selection">
                <b>1. Empieza a lanzar resultados, no productos.</b>
              </p>
              <p>
                Puede ser lo suficientemente difícil conseguir una audiencia con
                un tomador de decisiones. Cuando tu lo hagas, No los frustres
                enterrándolos. En lugar de vadear a través de todos Los detalles
                y las características de lo que está vendiendo les dan una
                imagen clara. de cómo se beneficiarán.
              </p>
              <p>
                Theodore Levitt lo expresó de manera sucinta: “La gente no
                quiere comprar un taladro de un cuarto de pulgada. Quieren un
                agujero de un cuarto de pulgada.”
              </p>
              <p>
                Cuando se acerque a un nuevo cliente, acuda a ellos con números
                específicos en mente. Por ejemplo:
              </p>
              <p>
                <ul>
                  <li>
                    Podemos ahorrarle doce horas por semana en costos contables
                    y administrativos.
                  </li>
                  <li>
                    Nuestro equipo de seguridad está calificado para durar dos
                    años más que el más popular en el mercado.
                  </li>
                  <li>
                    Su personal de ventas pasará un 15% menos de tiempo
                    rastreando clientes potenciales.
                  </li>
                </ul>
              </p>
              <p>
                {' '}
                Por supuesto, sus reclamaciones son tan buenas como su
                evidencia. Traiga estudios de casos y ejemplos.{' '}
              </p>
              <p>
                {' '}
                <b>
                  {' '}
                  2. Investiga clientes potenciales para identificar sus
                  problemas{' '}
                </b>{' '}
              </p>
              <p>
                ¿En qué está trabajando su posible cliente en este momento? ¿Con
                qué lucharon el último cuarto? o el año pasado? ¿Cuánto les
                cuestan sus problemas? Si conoces las respuestas a estas
                preguntas, no solo puede mejorar los resultados mencionados
                anteriormente, también puede planificar su Enfoque completo.
              </p>
              <p>
                {' '}
                Aquí hay algunos pasos que puede seguir para estar al tanto de
                lo que enfrentan sus prospectos:{' '}
              </p>
              <p>
                <ul>
                  <li>
                    {' '}
                    Configure las Alertas de Google para estar al tanto de las
                    noticias sobre sus prospectos.{' '}
                  </li>
                  <li>
                    {' '}
                    Lea sus comunicados de prensa e informes financieros
                    trimestrales.{' '}
                  </li>
                  <li>
                    {' '}
                    Visite su sitio web para obtener información sobre nuevos
                    proyectos y asociaciones.{' '}
                  </li>
                  <li>
                    {' '}
                    Lee los comentarios en sitios web como Glassdoor. Las
                    revisiones anónimas de empleados actuales y anteriores
                    pueden revelar áreas en las que una empresa está teniendo
                    dificultades.{' '}
                  </li>
                </ul>
              </p>
              <p>
                {' '}
                <b> Nunca olvide el poder de hacer contacto en persona </b>{' '}
              </p>
              <p>
                Esta es un área en la que el personal de ventas más viejo y más
                experimentado puede ser mentor de los millennials. que la
                comunicación electrónica, que prefieren los millennials, es
                ciertamente conveniente, simplemente no hay sustituto para
                reunirse con un cliente potencial persona. De hecho, incluso las
                llamadas en frío cara a cara pueden ser efectivas cuando se
                comparan telefonear llamadas frias.
              </p>
              <p>
                Esto es especialmente cierto cuando sus clientes son negocios
                pequeños, locales, operados por sus propietarios. cuando estas
                reuniones iniciales no dan como resultado una venta, ofrecen una
                gran oportunidad llegar a las empresas en su comunidad. Cuando
                se trata de ventas B2B locales, reconocimiento. la comunidad son
                excepcionalmente valiosas.
              </p>
              <p>
                {' '}
                <b> Ofrecer variadas estrategias de precios </b>{' '}
              </p>
              <p>
                Si te acercas a los clientes con una sola estructura de precios,
                podrías ser hundido antes de comenzar. que hay muchos factores
                que afectan las preferencias de un prospecto de negocios cuando
                a pagar por tus productos y servicios. Estos incluyen, pero no
                se limitan a efectivo y el deseo de probar su nueva relación con
                su empresa antes de hacer una compromiso. Los vendedores deben
                asistir a las reuniones con varias opciones de precios. Esta a
                los prospectos elegir el que mejor se adapte a ellos.
              </p>
              <p>
                Por ejemplo, si está ofreciendo servicios de jardinería, podría
                ofrecer un precio con descuento por por adelantado, un precio
                ligeramente más alto para los pagos se extendió durante seis
                meses, y un tercero para pagos extendidos a lo largo de un año.
                También puede ofrecer soporte en niveles también.
              </p>
              <p>
                {' '}
                <b> No baje sus precios para obtener una venta </b>{' '}
              </p>
              <p>
                No sirve de mucho cerrar las ventas de bajo valor. Esto es a
                menudo lo que sucede cuando los vendedores más bajos por debajo
                de la valoración para cerrar una venta. El tiempo es mucho mejor
                gastado en los clientes puede pagar su precio base y quién tiene
                el potencial de crecer en su nivel superior
              </p>
              <p>
                Si no tiene muchos de estos clientes, es probable que no tenga
                suficientes clientes potenciales de calidad. trabajar para
                generar más clientes potenciales desde Google, redes sociales o
                hasta la persecución mediante a las herramientas de venta. Puede
                utilizar una herramienta de generación de leads como Bant.io y
                una herramienta de CRM. Salesforce para obtener y nutrir
                clientes potenciales.
              </p>
              <p>
                En ningún momento, puede comenzar a tener suficientes clientes
                que puedan pagar lo que cobra. que no todas las ventas son
                iguales. Tus clientes van a ser exigentes. determinen si comprar
                o no sus servicios. Es perfectamente razonable tú también estás
                discerniendo.
              </p>
              <p>
                Estos consejos son simples y prácticos. No solo funcionan,
                tienen sentido. Dado que millennials tienen más probabilidades
                de aceptar políticas razonables, eso es una victoria todos los
                involucrados.
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
  ],
};

export const marketing = {
  keyword: ['digital marketing', 'marketing', 'e-commernce', 'retail'],

  title: 'marketing',

  desc: 'marketing-description',

  res: [
    {
      name: 'customer-demographics',
      desc: () => (
        <div>
          <p id="tour-selection" className="table-img">
            <img src={customerDemographics} alt="customer-demographics" />
          </p>
        </div>
      ),
      type: 'dom',
    },
    {
      name: 'customer-satisfaction-survey',
      desc: () => (
        <div>
          <p className="table-img">
            <img
              src={customerSatisfactionSurvey}
              alt="customer-satisfaction-survey"
            />
          </p>
        </div>
      ),
      type: 'dom',
    },
  ],
};

export const strategy = {
  keyword: ['strategy', 'sales', 'financial', 'analysis'],

  title: 'business-strategy-proposal',

  desc: 'business-strategy-proposal-description',
  res: [
    {
      name: 'customer-client-feedback',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">
                {' '}
                <b>2018 Customer/Client Feedback Summary </b>
              </p>

              <p>Total number of feedback forms collected: 1,678</p>

              <p>Total number from each department:</p>

              <p>
                <ul>
                  <li> Sales: 846 </li>
                  <li> Customer Service: 703 </li>
                  <li>IT: 0</li>
                  <li>Marketing: 0</li>
                  <li>Research and Development: 0</li>
                  <li>Accounting and Finance: 0</li>
                  <li>HR: 5</li>
                  <li>Operations: 0</li>
                  <li>Purchasing: 124</li>
                  <li>Legal: 0</li>
                </ul>
              </p>

              <p>
                <b>Randomly selected samples of customer feedback:</b>
              </p>
              <p>
                “I thought the customer service was pretty good. More
                straight-to-the-point than anything but the representative got
                the job done, and quickly too, so I can’t complain.”
              </p>
              <p>
                “Really enjoy the efficient customer service at this company!
                When I came in, the worker was helpful and answered all the
                questions I had (and trust me, I had a lot!). You have yourself
                a loyal customer in me.”
              </p>
              <p>
                “I’m seriously done with this company. Every time I’ve had
                encounters with staff from this company, I’ve had the worst
                experiences. From being put on hold for close to an hour, to
                dismissive and rude attitudes, to being bounced around from
                person to person, I always feel like my time is wasted when I
                deal with this company. I don’t even expect anything above and
                beyond the bare minimum of business dealings - just some basic
                courtesy and proper operations is all I hope for.”
              </p>
              <p>
                “Definitely felt as if I was treated like just a number here.
                I’m a 3 year customer, a pretty low maintenance one too at that,
                but the one time I needed to speak to someone about an issue, I
                felt like I was speaking to a robot. I’m not expecting to be
                treated like royalty or anything like that, but I just couldn’t
                shake off how distant the worker seemed.”
              </p>
            </div>
          );
        }

        if (lang === 'es') {
          return (
            <div>
              <p id="tour-selection">
                {' '}
                <b> 2018 Resumen de comentarios de clientes / clientes </b>{' '}
              </p>

              <p>
                {' '}
                Número total de formularios de comentarios recopilados: 1,678{' '}
              </p>

              <p> Número total de cada departamento: </p>

              <p>
                <ul>
                  <li> Ventas: 846 </li>
                  <li> Servicio al cliente: 703 </li>
                  <li> IT: 0 </li>
                  <li> Marketing: 0 </li>
                  <li> Investigación y desarrollo: 0 </li>
                  <li> Contabilidad y finanzas: 0 </li>
                  <li> HR: 5 </li>
                  <li> Operaciones: 0 </li>
                  <li> Compras: 124 </li>
                  <li> Legal: 0 </li>
                </ul>
              </p>

              <p>
                {' '}
                <b>
                  {' '}
                  Muestras seleccionadas al azar de comentarios de clientes:{' '}
                </b>{' '}
              </p>
              <p>
                “Pensé que el servicio al cliente era bastante bueno. Más
                directo al punto que cualquier cosa, excepto el representante,
                hizo el trabajo y también rápidamente, por lo que no puedo
                quejarme”.
              </p>
              <p>
                “Realmente disfrute el servicio al cliente eficiente en esta
                empresa! Cuando entré, el trabajador estaba fue útil y contestó
                todas las preguntas que tenía (y créeme, tenía muchas!). Te
                tienes a ti mismo Un cliente leal en mi”.
              </p>
              <p>
                “Estoy realmente hecho con esta empresa. Cada vez que he tenido
                encuentros con el personal de este Empresa, he tenido las peores
                experiencias. Desde ser puesto en espera por cerca de una hora,
                hasta Actitudes desdeñosas y groseras, hasta ser rebotado de
                persona a persona, siempre Siento que mi tiempo se pierde cuando
                trato con esta compañía. Ni siquiera espero nada por encima y
                más allá del mínimo de negocios, solo un poco de cortesía básica
                y las operaciones adecuadas es todo lo que espero”.
              </p>
              <p>
                “Definitivamente sentí como si me trataran como a un solo número
                aquí. Soy un cliente de 3 años, una bonita un poco de
                mantenimiento también, pero la única vez que tuve que hablar con
                alguien sobre un problema, Sentí que estaba hablando con un
                robot. No espero que me traten como a la realeza ni a nada. así,
                pero simplemente no podía deshacerme de lo distante que parecía
                el trabajador”.
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'performance-management-results',
      desc: () => (
        <div>
          <p className="table-img">
            <img
              src={performanceManagementResults}
              alt="performance-management-results"
            />
          </p>
        </div>
      ),
      type: 'dom',
    },
    {
      name: 'profits-chart',
      desc: () => (
        <div>
          <p className="table-img">
            <img src={profitsChart} alt="profits-chart" />
          </p>
        </div>
      ),
      type: 'dom',
    },
  ],
};

export const engineer = {
  keyword: [
    'software-engineering',
    'product-design',
    'product-development',
    'innovation',
  ],

  title: 'software-engineering-challenge',

  desc: 'software-engineering-challenge-description',
  res_time: 180,
  wildcard_time: 120,
  res: [
    {
      name: 'why-software-development',
      desc: () => (
        <div>
          <p id="tour-selection">
            {' '}
            <b>Poor communication:&nbsp;</b>Effective communication is valuable
            in the workplace for so many reasons. It creates a healthy
            environment for employees.
          </p>

          <p>
            <b>Resistance to change:&nbsp;</b>Embracing change and being open to
            new things can have a great impact on your work.
          </p>

          <p>
            <b>Not reviewing project progress on a regular basis:&nbsp;</b>Not
            measuring your progress against your initial plan often can cause
            big and unpleasant surprises.
          </p>

          <p>
            <b>Unclear requirements:&nbsp;</b>Not going through a complete
            planning exercise with your client before you start building is a
            guarantee for failure.
          </p>

          <p>
            <b>Unrealistic expectations:&nbsp;</b>Even if you are very excited
            about the upcoming project, don’t commit to an end date until you
            understand exactly what the client needs and what you’re expected to
            deliver.
          </p>

          <p>
            <b>The absence of a good project manager:&nbsp;</b>Not having a
            strong manager guiding the team eventually leads to a mediocre
            product that is delivered too late.
          </p>

          <p>
            <b>Working without purpose:&nbsp;</b>You and your team need to
            understand the project’s purpose and believe it’s something worth
            building.
          </p>

          <p>
            <b>Moving the goalposts too often:&nbsp;</b>Changing the project’s
            objectives and specifications too often without clearly
            communicating a reason for it can cause your team a lot of fatigue
            and frustration.{' '}
          </p>

          <p>
            <b>Not investing enough time and money in your team:&nbsp;</b>
            Empowering your team members by allowing them to play to their
            strengths can make a difference in the success of the project.
          </p>

          <p>
            <b>Over-promising just to close the deal:&nbsp;</b>If you over
            promise just to win the contract, you’ll most likely end up
            under-delivering.{' '}
          </p>
        </div>
      ),
      type: 'dom',
      visible: true,
    },
    {
      name: 'case-1-drama',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">
                {' '}
                <b>The product</b>
              </p>

              <p>
                DRAMA (Design RAtionale MAnagement) was a commercialization of a
                University prototype for recording the decision-making process
                during the design of complex and long-lived artefacts, for
                example nuclear reactors and chemical plants. By recording it in
                a structured database this information would still be available
                long after the original engineers had forgotten it, retired or
                been run over by buses. This information was believed to be
                incredibly valuable to later maintainers of the system,
                engineers creating similar designs and industry regulators. The
                development was part funded by 4 big process engineering
                companies.
              </p>

              <p>
                <b>Why it was judged a commercial failure</b>
              </p>
              <p>
                Everyone told us what a great idea it was, but no one bought it.
                despite some early funding from some big process engineering
                companies, none of them put it into use properly and we never
                sold any licences to anyone else.
              </p>

              <p>
                <b>What went wrong</b>
              </p>
              <p>
                <ul>
                  <li>
                    Lack of support from the people who would actually have to
                    use it. There are lots of social factors that work against
                    engineers wanting to record their design rationale,
                    including:
                    <p>
                      <ul>
                        <li>
                          The person taking the time to record the rationale
                          probably isn’t the person getting the benefit from it.
                        </li>
                        <li>
                          Extra work for people who are already under a lot of
                          time pressure.
                        </li>
                        <li>
                          It might make it easier for others to question
                          decisions and hold companies and engineers accountable
                          for mistakes.
                        </li>
                        <li>
                          Engineers may see giving away this knowledge as
                          undermining their job security.
                        </li>
                      </ul>
                    </p>
                  </li>
                  <li>
                    {' '}
                    Problems integrating with the other software tools that
                    engineers spend most of their time in (e.g. CAD packages).
                    This would probably be easier with modern web-based
                    technology.{' '}
                  </li>
                  <li>
                    {' '}
                    It is difficult to capture the subtleties of the design
                    process in a structured form.{' '}
                  </li>
                  <li>
                    {' '}
                    A bad hire. If you hire the wrong person, you should face up
                    to it and get rid of them. Rather than keep moving them
                    around in a vain attempt to find something they are good at.{' '}
                  </li>
                  <li>
                    {' '}
                    We took a phased approach, starting with a single-user proof
                    of concept and then creating a client-server version. In
                    hindsight it should have been obvious that not enough people
                    were actively using the single-user system and we should
                    have killed it then.{' '}
                  </li>
                </ul>
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'case-2-highlighter',
      desc: () => (
        <div>
          <p id="tour-selection">
            {' '}
            <b>The product</b>
          </p>
          <p>
            Highlighter. A utility to print neatly formatted, syntax highlighted
            source code listings.
          </p>

          <p>
            <b>Why it was judged a commercial failure</b>
          </p>
          <p>
            I earnt a grand total of £442.52 (about $700 in todays money) in
            just over two years, so I guess it paid for itself if you exclude my
            time.
          </p>

          <p>
            <b>What went wrong</b>
          </p>
          <p>
            Since it was my first product and I was very green about both
            marketing and product development. I would suggest the following
            would have made things better:
          </p>
          <p>
            <ul>
              <li>
                Get feedback from potential users about the product (eg from the
                ASP forums). Some parts of the program where probably too option
                heavy and geeky.
              </li>
              <li>
                {' '}
                Diversify. If people didn’t want to print fancy listings, maybe
                they would have wanted them formatted in HTML.{' '}
              </li>
              <li>
                {' '}
                Better marketing. I’m not sure this would have saved it, but all
                I knew in those days was uploading to shareware sites. I never
                even sent a press release.{' '}
              </li>
            </ul>
          </p>
          <p>
            {' '}
            figure it failed simply because it was a product nobody wanted.
            Actually, more importantly than that, it was a product *I* didn’t
            want to use, but it developed from a larger product I was working
            on, on the assumption I could earn some money on the side from part
            of the code. Since then I’ve stuck to products which I’ve actually
            wanted to use myself. There’s a lot to be said for dogfooding, not
            just for debugging, but for knowing where the pain points are and
            what extra features could be added.
          </p>
        </div>
      ),
      type: 'dom',
    },
    {
      name: 'case-3-screenrest',
      desc: () => (
        <div>
          <p id="tour-selection">
            {' '}
            <b>The product</b>
          </p>
          <p>
            ScreenRest – a consumer software product that reminds users to take
            regular rest breaks while using their computer.
          </p>

          <p>
            <b>Why it was judged a commercial failure</b>
          </p>
          <p>
            ScreenRest failed commercially because we built a product without
            having a clearly defined market. This was compounded by it offering
            prevention, not a solution. ScreenRest continues to regularly sell a
            small number of licences but not in sufficient quantity to justify
            further enhancements. The conversion rates are good, but there are
            simply not enough visitors to the website.
          </p>

          <p>
            <b>What went wrong</b>
          </p>
          <p>
            <ul>
              <li>Not doing market research first.</li>
              <li>
                {' '}
                Creating a prevention rather than solution product – people
                generally wait until they have a problem and then look for a
                solution.{' '}
              </li>
              <li>
                {' '}
                Creating a product with medical associations – the SEO and PPC
                competition for related keywords is prohibitive for a product
                with a low purchase price.{' '}
              </li>
            </ul>
          </p>
        </div>
      ),
      type: 'dom',
    },
  ],
};

export const consulting = {
  keyword: ['consulting', 'merger', 'm-a', 'teamwork'],

  title: 'consulting',

  desc: 'consulting-description',
  res_time: 180,
  wildcard_time: 120,
  res: [
    {
      name: 'consulting-resource-3',
      desc: () => (
        <div>
          <p>
            More and more companies are relying on mergers &amp; acquisitions
            (M&amp;A) as a competitive growth strategy. Since 2012, M&amp;A
            activity has increased dramatically in both number of deals and size
            of transaction, with the yearly value of global M&amp;A deals
            tracking above $4.5 trillion for the past four years. These are
            heady numbers and 2018 is expected to continue apace. Yet when
            mergers are not done correctly, the end result can be at best
            uncomfortable, and at worst devastating to both companies.
          </p>
          <p>
            As part of my consulting work on mergers and acquisitions, I created
            a playbook that defines the best practices for optimizing the human
            side of M&amp;A. To uncover the human facets and the consistent
            challenges of M&amp;A, I interviewed 55 executives from
            multinational to small- to medium-size companies all over the world.
            The interviewees, who were in the process of an M&amp;A deal or who
            had recently been through one, included C-suite executives, private
            equity dealmakers, business owners, entrepreneurs, and middle
            managers. From these sessions, a consistent theme emerged: M&amp;A
            often fosters us-versus-them thinking, which can undermine deal
            success from the get-go.
          </p>
          <p>
            One of the great ironies of M&amp;A activity is that trust, a key
            ingredient for business success, often quickly dissolves, as M&amp;A
            activity is usually cloaked in secrecy. A workforce can feel
            blindsided when a deal is announced, eroding trust and transparency
            in three mutually reinforcing ways:
          </p>
          <p>
            <ul>
              <li>“our” company versus “their” company</li>
              <li>executives versus frontline employees</li>
              <li>who stays versus who goes</li>
            </ul>
          </p>
          <p>Let’s look at each of these:</p>
          <p>
            <b>Our Company Versus Their Company</b>
          </p>
          <p>
            When a merger or acquisition is announced, people instinctively
            wonder who “they” are — “they” being the company on the other side.
            Whether the company is known or not, there’s an instinctive reaction
            to regard “them” with a wary eye. Cultural differences can emerge,
            particularly if the companies have been at different ends of the
            spectrum in the marketplace. What makes sense on paper — i.e. a
            high-end product-line company merging with a low-end product-line
            company — can devolve into an us versus them dynamic as the
            companies’ different approaches and cultures inevitably conflict.
          </p>
          <p>
            Consider this example: When The Interpublic Group (IPG) merged the
            direct-marketing company Draft with the ad-agency Foote Cone &amp;
            Belding (FCB) to become one agency in 2006, “it was immediately
            apparent that the cultures of the two agencies were wildly
            different,” shared Marty Stock, then head of Coors advertising at
            FCB. “In bringing together a specialist direct-marketing agency with
            a generalist creative shop, cultural differences were bound to
            arise, given the contrast in customer approach and sensibilities.
            The differences drove an ‘us’ and ‘them’ mentality which was never
            really resolved, and which made integration unbelievably difficult.”
            Millions of lost dollars from client defections later, FCB split
            from Draft and reverted back to its origins in 2014.
          </p>
          <p>
            Examples of successful acquisitions do exist, however, where the
            “our” company versus “their” company dynamic is minimized, largely
            due to the approach of the acquiring company. When Enterprise
            Rent-A-Car acquired Vanguard’s Alamo Rent-A-Car and National Car
            Rental in 2007, rather than executing a takeover, it moved slowly
            and sought to learn from its new brands. “Once the deal closed,”
            sharedEnterprise CEO Andrew Taylor, “Enterprise pursued a deliberate
            integration. It was far more important to do it right than to do it
            quickly. We acquired Vanguard at an affordable price, so we could
            afford a thoughtful approach. When a new direction was chosen, it
            would reflect the best elements of both cultures and operating
            approaches.”
          </p>
          <p>
            <b>Executives Versus Frontline Employees</b>
          </p>
          <p>
            As senior leaders drive the integration process, midlevel and
            lower-level employees can begin to perceive senior level executives
            as getting more than their “fair share.” A perception that senior
            management is making money off of midlevel employees’ hard work can
            emerge. Should job losses occur, tensions may intensify as the
            remaining workers feel burdened “doing the job of many” to implement
            a strategy that executives, not managers, defined.
          </p>
          <p>
            Even when there’s been a strong camaraderie throughout the
            organization, people can feel betrayed when executives leave with
            robust pay packages. Employees are not ignorant to M&amp;A
            precedents where even CEOs of failed acquisitions have left with
            substantial pay packages. In those moments, trust erodes.
          </p>
          <p>
            Executives have a critical role in minimizing us versus them
            thinking. Demonstrating commitment to the vision in word and deed is
            critical, and the pursuit of every activity must tie back to how it
            fits (or doesn’t fit) with the bigger picture. Nothing undermines
            change and its adoption more than behaviors by key individuals that
            are inconsistent with their words. To gain the workforce’s trust you
            must “walk the talk.”
          </p>
          <p>
            <b>Who Stays versus Who Goes</b>
          </p>
          <p>
            Cost-cutting and job losses typically occur in M&amp;A as companies
            aggressively pursue efficiencies and eliminate redundancies.
            Deciding who stays and who goes are hard-wrought decisions.
            Transparency is difficult as executives and managers are either
            legally prohibited from being more open or don’t know how things
            will play out. Trust is diluted further when, in an attempt to keep
            people motivated, early communications sometimes say that “nothing
            will change,” and yet employees see change happening as people are
            let go.
          </p>
          <p>
            Kim Feil, Chief Marketing and Strategy Officer for Aspire Healthy
            Energy Drinks, who experienced five separate M&amp;A deals as head
            of marketing for Cadbury, IRI, Kimberly-Clark, Walgreen’s, and
            OfficeMax, had this to share: “Leaders know that while M&amp;A can
            make sense on paper, the ability to achieve the vision is only as
            good as the team you put together.” During her multiple M&amp;A
            experiences, Feil encountered well-thought-out organizational
            planning as well as unexpected curve balls. “Who will still have a
            chair when the music stops becomes the daily question,” Feil added.
            “So much is dictated by timing and where you are when the music
            dies. That said, you can’t just hope that things will work out.”
          </p>
          <p>
            Feil attributes her successful acquisition experiences to upfront
            planning with leaders from both companies. “The key was focusing on
            the requirements for success, defining the teams needed to achieve
            them, and how they would intersect. ‘Who’ did it was not part of the
            upfront discussion, just the organizational design and structure
            were considered. Once that was defined, then all potential candidate
            profiles were considered and names then populated the structure.”
            What about the names not immediately selected? A clear message
            arose, consistently shared by executives I interviewed: when
            experiencing a merger or acquisition, know your value; don’t wait
            for the company to tell you what it is. Determine how your skills
            and experience will contribute to the mission and demonstrate that
            expertise repeatedly. Equally critical? If you determine your skills
            are no longer valued, find the employer who values them.
          </p>
          <p>
            While us versus them thinking can undermine deal success, it doesn’t
            have to. These examples emphasize actions to take which can minimize
            the downside potential: a well-planned integration with a cohesive
            culture as the focus; consistent communication and commitment to the
            transition in both words and actions; and an organizational
            structure defined by what is best for the customer will go a long
            way toward positioning the new organization for success.
          </p>
        </div>
      ),
      type: 'dom',
      visible: true,
    },
    {
      name: 'consulting-resource-1',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">
                The client has collected feedback from employees on the issues
                they are facing post-merger and sent some sample comments,
                summarized here:
              </p>
              <p>
                <ul>
                  <li>
                    A financial officer is requesting a lateral change within
                    the company, from his current team to a different one, after
                    what he reports as “months of arguing between most of the
                    team members and going in circles about what to do, and how
                    to do things.”
                  </li>
                  <li>
                    The head graphic designer is complaining that the web
                    developers “do not want to consider perspectives that are
                    not their own, especially not that of younger women.”{' '}
                  </li>
                  <li>
                    An assistant copywriter reported feelings that “people that
                    came from the other company are just so different; their
                    background, their values, and so forth. It makes it hard for
                    us to get along.”{' '}
                  </li>
                </ul>
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'consulting-resource-2',
      desc: () => (
        <div>
          <p id="tour-selection">An outline of the merger strategy</p>
          <p className="table-img">
            <img src={consultingChart} alt="consulting-chart" />
          </p>
        </div>
      ),
      type: 'dom',
    },
  ],
};

export const crisisManagement = {
  keyword: ['consulting', 'customer-service', 'training'],

  title: 'crisis-manage',

  desc: 'crisis-description',
  res_time: 180,
  wildcard_time: 600,
  res: [
    {
      name: 'crisis-res-3',
      desc: () => (
        <div>
          <p>
            Training can be a powerful medium when there is proof that the root
            cause of the learning need is an undeveloped skill or knowledge
            deficit. For those situations, a well-designed program with
            customized content, relevant case material, skill building practice,
            and a final measurement of skill acquisition, works great. But, in
            the case of this organization, a lack of skills had very little to
            do with their problem. After asking leaders in the organization why
            they felt the need for training, we discovered the root causes of
            their problem had more to do with:
          </p>
          <p>
            <ul>
              <li>
                Ineffective decision-making processes that failed to clarify
                which leaders and groups owned which decisions
              </li>
              <li>
                Narrowly distributed authority, concentrated at the top of the
                organization
              </li>
              <li>No measurable expectations that employees make decisions</li>
              <li>
                No technologies to quickly move information to those who needed
                it to make decisions
              </li>
            </ul>
          </p>
          <p>
            Given these systemic issues, it’s unlikely a training program would
            have had a productive, or sustainable outcome. Worse, it could have
            backfired, making management look out of touch.Learning is a
            consequence of thinking, not teaching. It happens when people
            reflect on and choose a new behavior. But if the work environment
            doesn’t support that behavior, a well-trained employee won’t make a
            difference. Here are three conditions needed to ensure a training
            solution sticks.
          </p>
          <p>
            <ul>
              <li>
                <b>Internal systems support the newly desired behavior.</b>{' '}
                Spotting unwanted behavior is certainly a clue that something
                needs to change. But the origins of that unwanted behavior may
                not be a lack of skill. Individual behaviors in an organization
                are influenced by many factors, like: how clearly managers
                establish, communicate, and stick to priorities, what the
                culture values and reinforces, how performance is measured and
                rewarded, or how many levels of hierarchy there are. These all
                play a role in shaping employee behaviors.
              </li>
              <li>
                <b>There is a commitment to change.</b> Any thorough
                organizational assessment will not only define the skills
                employees need to develop, it will also reveal the conditions
                required to reinforce and sustain those skills once a training
                solution is implemented. Just because an organization recognizes
                the factors driving unwanted behavior, doesn’t mean they’re open
                to changing them.{' '}
              </li>
              <li>
                <b>
                  The training solution directly serves strategic priorities.
                </b>{' '}
                When an organization deploys a new strategy — like launching a
                new market or product — training can play a critical role in
                equipping people with the skills and knowledge they need to help
                that strategy succeed. But when a training initiative has no
                discernible purpose or end goal, the risk of failure is raised.{' '}
              </li>
            </ul>
          </p>
          <p>
            If you are going to invest millions of dollars into company
            training, be confident it is addressing a strategic learning need.
            Further, be sure your organization can and will sustain new skills
            and knowledge by addressing the broader factors that may threaten
            their success. If you aren’t confident in these conditions, don’t
            spend the money.
          </p>
        </div>
      ),
      type: 'dom',
      visible: true,
    },
    {
      name: 'crisis-res-1',
      desc: lang => {
        if (lang === 'en') {
          return (
            <div>
              <p id="tour-selection">
                The client has sent over a sample of complaints they have
                received from customers:{' '}
              </p>
              <p>
                <ul>
                  <li>
                    “I am extremely disappointed in the service (or lack
                    thereof) I have received from your company. Yesterday, I
                    called over and over from early afternoon until the evening
                    and couldn’t get ahold of anyone. When I finally got
                    through, I was put on hold for 18 minutes. Then, there was
                    no apologies or anything, only excuses for the phones being
                    busy all day. I finally got the issue with the platform
                    straightened out but still, by that point, I was so
                    frustrated and disappointed that it didn’t feel like that
                    mattered.”{' '}
                  </li>
                  <li>
                    “Took a while for the customer service representative to
                    understand my problem. Could have been my fault for not
                    explaining properly, but this led to me staying on the phone
                    for a pretty long time with them.”{' '}
                  </li>
                  <li>
                    “We were running into problems uploading patient files on
                    the platform and couldn’t quite figure out how to contact
                    your company. Couldn’t find an email address online. We
                    eventually called the phone line and got through right away.
                    The representative was very helpful but seemed to be rushing
                    through the conversation. Not a terrible experience but just
                    wanted to bring to your attention.”{' '}
                  </li>
                </ul>
              </p>
            </div>
          );
        }
      },
      type: 'dom',
    },
    {
      name: 'crisis-res-2',
      desc: () => (
        <div>
          <p className="table-img">
            <img src={crisisTable} alt="crisis-table" />
          </p>
        </div>
      ),
      type: 'dom',
    },
  ],
};

testdata.contextTypes = {
  t: PropTypes.func,
};
pitchIdea.context = {
  t: PropTypes.func,
};
