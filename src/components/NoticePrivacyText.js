import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { openComposer } from 'react-native-email-link';

const NoticePrivacyText = () => {
  const { textLinkStyle, rowStyle } = styles;

  return (
    <Layout>
      <Text category="c1" style={{ textAlign: 'justify' }}>
        <Text category="c1">
          Operadora de Centros de Espectáculos, S.A. de C.V.
        </Text>{' '}
        (en adelante <Text category="c1">&apos;OCESA&apos;</Text>), con
        domicilio en Av. Río Churubusco y Añil s/n, Colonia Granjas México,
        Alcaldía Iztacalco, CP 08400, CDMX en cumplimiento a lo establecido en
        la Ley Federal de Datos Personales en Posesión de los Particulares,
        tiene entre sus objetivos la protección de la información personal
        proporcionada por cada persona (la &quot;Información&quot;). Por lo
        anterior,
        <Text category="c1">OCESA</Text> ha establecido los siguientes
        lineamientos para proteger dicha información.
        {'\n'}
        {'\n'}
        INFORMACIÓN QUE RECOPILA OCESA A TRAVÉS DE LA APLICACIÓN DIGITAL
        (&quot;APP&quot;)
        {'\n'}
        {'\n'}
        Para registrarse en el Sitio, el Usuario podrá llenar un formulario de
        registro, ingresar a través de su cuenta de Facebook o a través del
        acceso como visitante (en el entendido que dicha forma de acceso no
        permite todas las funcionalidades de la App); al hacerlo, OCESA obtendrá
        los siguientes Datos Personales (y para el caso del Acceso a través de
        Facebook, además se estará sujeto a la configuración de privacidad del
        Usuario en su perfil público de redes sociales): nombre completo, fecha
        de nacimiento, dirección de correo electrónico, contraseña, país,
        estado, ciudad, género, ID de usuario, imagen de perfil, idioma, gustos
        e intereses.
        {'\n'}
        {'\n'}
        OCESA no recabará datos sensibles cuya utilización indebida pueda dar
        origen a discriminación o conlleve un riesgo grave para el Titular de
        los Datos Personales. Se consideran sensibles aquellos datos que puedan
        revelar aspectos como origen racial o étnico, estado de salud,
        información genética, creencias religiosas, filosóficas y morales,
        afiliación sindical, opiniones políticas, preferencia sexual y datos
        financieros.
        {'\n'}
        {'\n'}
        FINALIDAD
        {'\n'}
        {'\n'}
        OCESA recaba los Datos Personales que el Titular registra en el Sitio
        con la intención de ofrecer contenidos personalizados, hacerle llegar
        noticias, mantenerle informado sobre eventos de OCESA relacionados con
        sus intereses, anuncio de preventas, descuentos y cambios en el Aviso de
        Privacidad; así como para ofrecerle, de acuerdo a disponibilidad, acceso
        a promociones, contenidos exclusivos (videos, lanzamientos, descargas),
        análisis de datos y mejorar nuestros servicios, envío de publicidad
        propia y/o de terceros con quién OCESA tenga celebrados convenios y
        contenidos, para poder consultar el historial de transacciones
        realizadas dentro de los Eventos y/o de la App, entre otros.
        {'\n'}
        {'\n'}
        Al proporcionar los Datos Personales a través de nuestra App, el Titular
        acepta conocer y estar de acuerdo con los términos de este Aviso de
        Privacidad y consiente expresamente el tratamiento de sus Datos
        Personales conforme a lo descrito en él.
        {'\n'}
        {'\n'}
        PRIVACIDAD Y SEGURIDAD DE SU INFORMACIÓN
        {'\n'}
        {'\n'}
        Los Datos Personales pueden ser tratados por OCESA, ya sea por sí o por
        medio de empresas expresamente contratadas para ello, y los Servicios de
        la App son operados en los Estados Unidos Mexicanos y se somete a la
        jurisdicción de las leyes mexicanas. Si el Titular se encuentra fuera de
        los Estados Unidos Mexicanos, por favor tenga en cuenta que la todo lo
        relacionados a los servicios proporcionados, el tratamiento de su
        información y datos personales, así como cualquier otra información que
        recopilamos será procesada en el país señalado, y, por lo tanto, las
        leyes correspondientes a la jurisdicción del país en el que usted
        resida, aun cuando en dicha jurisdicción se les haya dado el carácter de
        extraterritoriales, no serán aplicables.
        {'\n'}
        {'\n'}
        OCESA implementa medidas de seguridad razonables para proteger su
        información tanto online como offline, y utiliza tecnología a su alcance
        para la protección de la Información proporcionada por los Usuarios del
        Sitio. Esta tecnología cifra, codifica y previene la intercepción de la
        información suministrada por el Internet.{' '}
        <Text category="c1">OCESA</Text> establece y mantiene medidas de
        seguridad administrativas, técnicas y físicas que permiten proteger los
        datos personales contra: daños, pérdida o alteración, destrucción, o el
        uso, acceso o tratamiento no autorizado. La App contiene hipervínculos o
        hipertextos &quot;links&quot;, banners, botones y herramientas de
        búsqueda que al ser oprimidos o utilizados por los Usuarios dirigen a
        otros sitios propiedad de terceros. No obstante que en algunos casos
        estos sitios o portales de terceros se encuentran enmarcados con la
        barra de navegación o el look & feel de la App, la Información que el
        titular llegase a proporcionar a través de esos sitios o portales no se
        encuentra cubierta o contemplada por este aviso de privacidad y su
        manejo o utilización no es responsabilidad de
        <Text category="c1">OCESA</Text>, por lo que recomendamos a nuestros
        usuarios verificar los avisos y políticas de privacidad desplegadas o
        aplicables a estos sitios o portales de terceros.
        {'\n'}
        {'\n'}
        La información que OCESA recaba a través de la App podrá ser utilizada
        para fines comerciales, como proporcionar datos estadísticos (por
        ejemplo: 50% de nuestros usuarios son mujeres) a anunciantes actuales y
        potenciales, enviar publicidad a los Usuarios de acuerdo con sus
        intereses específicos, y conducir investigaciones de mercadeo o
        promociones que OCESA considere apropiadas. OCESA también podrá revelar
        Información cuando por mandato de ley y/o de autoridad competente le
        fuere requerido.
        {'\n'}
        {'\n'}
        Al otorgar su consentimiento para la transferencia de datos personales a
        OCESA, el titular de los mismos reconoce y acepta que OCESA podrá hacer
        la transferencia de sus datos a terceros, incluyendo patrocinadores,
        publicistas, contratistas y/o socios comerciales con fines comerciales,
        publicitarios y estadísticos.
        {'\n'}
        {'\n'}
        OCESA se reserva el derecho de transferir la Información a cualquiera de
        sus filiales o subsidiarias en términos de la fracción III del artículo
        37 de la Ley.
        {'\n'}
        {'\n'}
        ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN - DERECHOS ARCO
        {'\n'}
        {'\n'}A fin de brindar al titular el medio para ejercer los derechos
        ARCO, OCESA pone a disposición de los titulares la dirección de correo
        electrónico{' '}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() => openComposer({ to: 'arco@cie.com.mx' })}>
          arco@cie.com.mx
        </Text>{' '}
        a través de la cual se dará trámite y seguimiento a las solicitudes de
        acceso, rectificación, cancelación u oposición.
        {'\n'}
        {'\n'}
        El titular podrá enviar a través de este medio una solicitud para el
        acceso, rectificación, cancelación u oposición, respecto de sus datos
        personales.
        {'\n'}
        {'\n'}
        Dicha solicitud deberá contener:
      </Text>

      <Layout style={{ marginTop: -30 }}>
        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              El nombre completo del titular y todos los datos que le fueron
              solicitados para registrarse así como un correo electrónico para
              comunicarle la respuesta a su solicitud.
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Copia electrónica de los documentos que acrediten la identidad del
              titular de los datos personales (RFC, IFE).
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Descripción clara y precisa de los datos personales respecto de
              los que se busca ejercer alguno de los derechos antes mencionados.
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Cualquier otro elemento o documento que facilite la localización
              de los datos personales.
            </Text>
          </Layout>
        </Layout>
      </Layout>

      <Text category="c1" style={{ textAlign: 'justify' }}>
        Indicar de las modificaciones a realizarse y/o las limitaciones al uso
        de los datos personales y aportar la documentación que sustente su
        petición.
        {'\n'}
        {'\n'}
        <Text category="c1">OCESA</Text> comunicará al titular de los datos
        personales la determinación adoptada, en un plazo no mayor a 20 días
        hábiles contados desde la fecha en que se recibió la solicitud. Este
        plazo podrá ser ampliado por
        <Text category="c1">OCESA</Text> en una sola ocasión por un periodo
        igual, siempre y cuando así lo justifiquen las circunstancias del caso.
        {'\n'}
        {'\n'}
        <Text category="c1">OCESA</Text> informará al titular de los datos
        personales el sentido y motivación de la resolución por correo
        electrónico y acompañará dicha resolución de las pruebas pertinentes, en
        su caso.
        {'\n'}
        {'\n'}
        <Text category="c1">OCESA</Text> podrá negar el acceso total o parcial a
        los datos personales o a la realización de la rectificación, cancelación
        u oposición al tratamiento de los mismos, en los siguientes supuestos:
        {'\n'}
      </Text>

      <Layout>
        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              {'\u2022'}
            </Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Cuando el solicitante no sea el titular o el representante legal
              no esté acreditado para ello.
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Cuando en la base de datos de
              <Text category="c1">OCESA</Text> no se encuentren los datos
              personales del solicitante.
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Cuando se lesionen los derechos de un tercero.
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Cuando exista impedimento legal o resolución de una autoridad.
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Cuando la rectificación, cancelación u oposición haya sido
              previamente realizada, de manera que la solicitud carezca de
              materia.
            </Text>
          </Layout>
        </Layout>
      </Layout>

      <Text category="c1" style={{ textAlign: 'justify' }}>
        La cancelación de datos personales dará lugar a un periodo de bloqueo
        tras el cual <Text category="c1">OCESA</Text>
         procederá a la supresión de los datos correspondientes. Una vez
        cancelados los datos personales correspondientes,
        <Text category="c1">OCESA</Text> dará aviso a su titular.
        {'\n'}
        {'\n'}
        Hecho lo anterior,
        <Text category="c1">OCESA</Text> podrá conservar los datos personales
        exclusivamente para efectos de las responsabilidades derivadas del
        tratamiento a que se reﬁere el Aviso de Privacidad.
        {'\n'}
        {'\n'}
        <Text category="c1">OCESA</Text> no estará obligado a cancelar los datos
        personales cuando se trate de los supuestos establecidos en el artículo
        vigésimo sexto de la Ley Federal para la Protección de Datos en Posesión
        de los Particulares.
        {'\n'}
        {'\n'}
        Asimismo, cuando la información recabada en los datos personales deje de
        ser necesaria para el cumplimiento de las ﬁnalidades previstas en este
        Aviso de Privacidad y en las disposiciones jurídicas aplicables, tus
        datos personales serán cancelados de la base de datos de
        <Text category="c1">OCESA</Text>.{'\n'}
        {'\n'}
        <Text category="c1">USO DE COOKIES</Text>
        {'\n'}
        {'\n'}
        Una cookie (o galleta informática) es una pequeña información enviada
        por un sitio web y/o plataforma de monitoreo y almacenada en la App del
        Usuario, de manera que la App puede consultar la actividad del Usuario.
        {'\n'}
        {'\n'}
        La App guardará una cookie en el navegador del Usuario al momento de
        iniciar sesión y contendrá información referente a su cuenta de acceso,
        pero no a su información personal. La finalidad es informar el estatus
        de sesión del Usuario en la App y la navegación que realiza dentro de la
        App con el fin de ofrecerle una experiencia personalizada, así como
        enviarle anuncios personalizados en la App a través de remarketing.
        {'\n'}
        {'\n'}
        El Usuario puede deshabilitar las cookies en opciones de internet,
        ajustes o preferencias que se encuentra dentro de su dispositivo móvil,
        es importante señalar que no podrá disfrutar de una experiencia
        personalizada dentro de la App.
        {'\n'}
        {'\n'}
        OCESA sólo almacenará los datos proporcionados por el Usuario en su
        respectiva Base de Datos sin rastrear ninguna otra información ni
        haciendo uso de su dirección IP.
        {'\n'}
        {'\n'}
        Si tiene alguna duda o pregunta respecto al Aviso de Privacidad, por
        favor contáctenos en la siguiente dirección:{' '}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() => openComposer({ to: 'contactoocesa@cie.com.mx' })}>
          contactoocesa@cie.com.mx
        </Text>
        {'\n'}
        {'\n'}
        Fecha de la última actualización: 15 de octubre de 2021
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  textLinkStyle: {
    textDecorationLine: 'underline',
  },
  rowStyle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default NoticePrivacyText;
