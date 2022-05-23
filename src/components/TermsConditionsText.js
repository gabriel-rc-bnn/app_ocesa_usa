import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { openComposer } from 'react-native-email-link';

const TermsConditionsText = ({ navigation }) => {
  const { textLinkStyle, rowStyle } = styles;

  return (
    <Layout>
      <Text category="c1" style={{ textAlign: 'justify' }}>
        Bienvenido a OCESA APP. A continuación se describen los Términos y
        Condiciones que rigen el uso de la aplicación digital denominada OCESA
        APPx (en adelante la “App”) y la cual es propiedad de Operadora de
        Centros de Espectáculos, S.A. de C.V. (en adelante “OCESA”) y/o sus
        filiales y subsidiarias.
        {'\n'}
        {'\n'}
        OCESA administra el contenido y los servicios disponibles en la App de
        conformidad con los siguientes Términos y Condiciones. Al acceder a la
        App, el Usuario manifiesta su conformidad y se obliga a cumplir los
        presentes Términos y Condiciones, así como la legislación aplicable en
        la materia.
        {'\n'}
        {'\n'}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() =>
            navigation.navigate('NoticePrivacy', {
              label: 'Aviso de privacidad',
            })
          }>
          DESCRIPCIÓN
        </Text>
        {'\n'}
        {'\n'}
        OCESA proporciona a los Usuarios el acceso y/o el uso de una serie de
        recursos y contenidos en línea a través de Internet, incluyendo, pero no
        limitado a: textos en línea, mensajes, mapas, promociones, trivias,
        galerías de imágenes y videos, entre otros, a través de la App.
        {'\n'}
        {'\n'}
        OCESA se reserva el derecho de modificar, agregar o eliminar, en
        cualquier momento y sin previo aviso la App, así como las condiciones
        requeridas para acceder y/o utilizarlo.
        {'\n'}
        {'\n'}
        La App es únicamente para el uso personal de los Usuarios y no puede
        utilizarse con relación a actividades comerciales. Los usos ilegales y/o
        no autorizados de la App serán investigados y se iniciará la acción
        legal correspondiente.
        {'\n'}
        {'\n'}
        OCESA mantendrá informados a los Usuarios de la App sobre eventos y
        espectáculos, por lo que el Usuario acepta y reconoce que, en caso de
        que al momento de realizar el registro en la APP nos haya proporcionado
        su consentimiento, OCESA podrá enviarle información, comunicados y/o
        publicidad a través de cualquier medio electrónico que considere
        apropiado. Al momento de registrarse, el Usuario acepta que toda la
        información proporcionada a OCESA es verdadera, precisa, actualizada y
        completa.
        {'\n'}
        {'\n'}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() =>
            navigation.navigate('NoticePrivacy', {
              label: 'Aviso de privacidad',
            })
          }>
          CONTRASEÑA
        </Text>
        {'\n'}
        {'\n'}
        El Usuario es el único responsable de mantener la confidencialidad de la
        contraseña emitida en su registro en la App y acuerda no acceder con el
        perfil, nombre o contraseña de otro Usuario, así como no crear cuentas
        falsas o fraudulentas. La contraseña es personal e intransferible por lo
        que el Usuario se compromete a utilizarla de conformidad con los
        presentes Términos y Condiciones. El Usuario es el único responsable de
        cualquier uso que se haga de su perfil y notificará de inmediato si
        sospecha del uso no autorizado de su cuenta o acceso a su contraseña.
        {'\n'}
        {'\n'}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() =>
            navigation.navigate('NoticePrivacy', {
              label: 'Aviso de privacidad',
            })
          }>
          MARCAS REGISTRADAS Y DERECHOS DE PROPIEDAD DE LA APP
        </Text>
        {'\n'}
        {'\n'}
        OCESA conserva todos los derechos de propiedad en los servicios de la
        App. El Usuario no deberá copiar, modificar, publicar, transmitir,
        distribuir, trabajar, tratar, desplegar o vender dicha información, y el
        acceso a la App no le otorga ningún derecho, concesión, título o interés
        de terceros con respecto a dicha propiedad.
        {'\n'}
        {'\n'}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() =>
            navigation.navigate('NoticePrivacy', {
              label: 'Aviso de privacidad',
            })
          }>
          CONTENIDO PUBLICADO EN LA APP
        </Text>
        {'\n'}
        {'\n'}
        El Usuario reconoce y acepta que OCESA puede (pero no está obligado a)
        revisar el contenido que se publica y, en su caso, borrar o rehusarse a
        ponerlo en línea.
        {'\n'}
        {'\n'}
        El Usuario acepta que es el único responsable del contenido que publique
        en relación a su actividad y/o información derivada de la App o
        transmita a otros Usuarios por cualquier medio incluido redes sociales.
        Al publicar contenido en algún área de la App o en relación con la
        misma, el Usuario asegura y garantiza que tiene derecho a conceder a
        OCESA una licencia irrevocable, perpetua, no exclusiva, mundial,
        totalmente pagada para reproducir, distribuir, mostrar públicamente,
        interpretar, o de otro modo usar el Contenido, y a realizar obras
        derivadas o incorporar el Contenido en otras obras, así como conceder y
        otorgar sub-licencias sobre todo lo anterior.
        {'\n'}
        {'\n'}
        El Usuario declara que no publicará contenido ilegal o prohibido y no
        violará, malversará, infringirá o contravendrá algún derecho de Tercero
        (incluyendo, sin limitación, cualquier derecho de propiedad intelectual
        y personal) en relación con la App. Enseguida se enlista de manera
        enunciativa más no limitativa el tipo de contenido que es ilegal o está
        prohibido en la App o en relación con la misma:
        {'\n'}
      </Text>

      <Layout>
        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que sea claramente ofensivo para la comunidad en línea, como
              contenido que promueva el racismo, la intolerancia, el odio o la
              agresión física o moral de cualquier tipo, en contra de cualquier
              grupo o individuo
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que acose o promueva el acoso de otra persona
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que involucre la transmisión o envío de correos masivos o spam y
              cartas cadena
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que transmita virus, gusanos, defectos, caballos de Troya, o
              cualquier otro elemento de naturaleza destructiva
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que promueva información falsa o engañosa o promueva actividades
              ilegales o conductas que sean abusivas, amenazantes, obscenas,
              difamatorias o calumniosas
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que promueva la copia ilegal o no autorizada de obras protegidas
              por derechos de autor (ya sea que estén marcadas o no), infrinja
              derechos de autor o proporcione piratería o vínculos a ella
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que contenga páginas restringidas o de acceso con contraseña, o
              páginas o imágenes ocultas (aquellas no vinculadas o accesibles
              desde otra página)
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que despliegue material pornográfico o sexualmente explícito de
              cualquier tipo y en cualquier forma
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que proporcione material que explote a cualquier persona de manera
              sexual o violenta, o solicite información personal de otros
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que proporcione instrucciones sobre actividades ilegales como
              atentar contra la privacidad de alguien, o proporcionar o crear
              virus informáticos
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que solicite contraseñas o información de identificación personal
              de cualquier tipo para propósitos comerciales o ilegales; y esté
              involucrado en actividades comerciales y/o ventas sin nuestro
              consentimiento previo, incluyendo, sin limitación, concursos,
              loterías, trueques, publicidad y esquemas piramidales
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que constituya, promueva o se use principalmente con el propósito
              de falsificar o traficar bienes, productos robados, drogas
              ilegales y parafernalia, artículos usados para robar, comercio no
              autorizado, o de otra manera viole los términos y cree
              responsabilidad civil, penal o administrativa
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Que altere o falsifique los resultados generados por las
              participaciones que realice cualquier Usuario de la App
            </Text>
          </Layout>
        </Layout>
      </Layout>

      <Text category="c1" style={{ textAlign: 'justify' }}>
        En caso de verificarse un incumplimiento por parte del Usuario hacia
        estos Términos y Condiciones, OCESA podrá denegar o retirar el acceso al
        App en forma inmediata.
        {'\n'}
        {'\n'}
        USO PERMITIDO
        {'\n'}
        {'\n'}
        El Usuario manifiesta en este acto que conoce plenamente el estar
        autorizado para visitar, ver, consultar, participar, interactuar y en
        algunos casos descargar y comentar la App o en relación con la misma
        para su propio uso, y que no deberá duplicar, publicar, modificar,
        distribuir o alterar lo publicado por la App para ningún propósito
        distinto que no sea revisar eventos e información de publicidad, para
        uso personal, para participar en promociones o para comprar boletos o
        mercancía, a menos que haya sido autorizado específicamente por OCESA
        para otro fin. El contenido y software de esta App es propiedad de OCESA
        y/o sus proveedores, y está protegido bajo las leyes internacionales y
        nacionales de derecho de autor.
        {'\n'}
        {'\n'}
        El Usuario acepta y reconoce que no deberá publicar contenido que
        incluya o contenga programas espía (spyware), adware, virus, documentos
        corruptos, programas gusano o cualquier otro código destinado a
        interrumpir, dañar, y/o limitar el funcionamiento de cualquier software,
        hardware, telecomunicaciones, redes, servidores u otros equipos, ni
        contenido que esté relacionado con el envío de correo no deseado o
        “spam”.
        {'\n'}
        {'\n'}
        ENLACES Y RESULTADOS DE BÚSQUEDA
        {'\n'}
        {'\n'}
        La App puede producir automáticamente resultados de búsqueda que tienen
        referencias o se enlazan a sitios de terceros. OCESA no tiene control
        sobre estos sitios o su contenido y no garantiza que el contenido de
        estos sitios sea exacto, legal y/o inofensivo. OCESA no patrocina el
        contenido de sitios de Terceros, ni asegura que no contendrán virus o
        que no impactarán de cualquier otra manera a su equipo. Al utilizar esta
        App para realizar búsquedas o para enlazarse a otro sitio, el Usuario
        está de acuerdo y entiende que no podrá realizar ningún reclamo en
        contra de OCESA por cualquier daño o pérdida, cualquiera que sea, al
        usar la App.
        {'\n'}
        {'\n'}
        ACCESO E INTERFERENCIA
        {'\n'}
        {'\n'}
        El Usuario está de acuerdo en no utilizar ningún tipo de aparato o
        software que interfiera con el funcionamiento adecuado de la App, ni
        tratará de interferir con esta. El Usuario está de acuerdo en no copiar,
        reproducir, alterar, modificar, crear trabajos derivativos o mostrar
        públicamente contenido de la App sin previo permiso por escrito de OCESA
        (con excepción de que sea para uso personal y no comercial).
        {'\n'}
        {'\n'}
        MANTENIMIENTO Y HORARIOS DE SERVICIO
        {'\n'}
        {'\n'}
        OCESA hará sus mejores esfuerzos para mantener en servicio la App, así
        como dar el debido mantenimiento de forma ordinaria con la finalidad de
        otorgar una navegación rápida, segura y sencilla para el uso de la App;
        por lo anterior, realizará sus mejores esfuerzos para que los servicios
        de mantenimiento que requiera la App se realicen en horarios que causen
        el menor impacto posible en la navegación, sin perjuicio de lo anterior,
        el Usuario acepta y reconoce que OCESA no será responsable por las
        interrupciones para el acceso que se generen en la App.
        {'\n'}
        {'\n'}
        De igual manera, el Usuario acepta y reconoce que OCESA y sus socios
        comerciales no serán responsables por cualquier daño, perjuicio o
        pérdida al Usuario causados por fallos en el sistema, en el servidor o
        en la conexión de Internet. OCESA y sus socios comerciales tampoco serán
        responsables por cualquier virus, malware, badware, código maligno,
        software malicioso, software malintencionado que pudiera afectar, dañar,
        desconfigurar, eliminar cualquier tipo de información o software, entre
        otros y/o infectar el equipo del Usuario como consecuencia del acceso,
        uso o examen de la App de cualquier transferencia de datos, archivos,
        imágenes, textos o audio contenidos en la misma. El Usuario no podrá
        imputarle a OCESA ni a sus socios comerciales responsabilidad alguna ni
        exigir pago por daños y perjuicios, resultantes de dificultades técnicas
        o fallos en la App. OCESA no garantiza el acceso y uso continuado o
        ininterrumpido de la App. El sistema puede eventualmente no estar
        disponible debido a dificultades técnicas o fallos de Internet, o por
        cualquier otra circunstancia ajena a la App y/o OCESA; en tales casos se
        procurará restablecer la App con la mayor celeridad posible sin que por
        ello pueda imputársele algún tipo de responsabilidad.
        {'\n'}
        {'\n'}
        PROMOCIONES
        {'\n'}
        {'\n'}
        OCESA podrá ofrecer promociones que requieren el registro del Usuario,
        por lo que en caso de resultar acreedor, te contactará para informarte
        de esto e indicar el procedimiento para entregar los beneficios, Al
        participar en promociones, el Usuario deberá apegarse a las bases de
        cada una de ellas.
        {'\n'}
        {'\n'}
        VIOLACIÓN A LOS TÉRMINOS Y CONDICIONES
        {'\n'}
        {'\n'}
        Cualquier violación a los Términos y Condiciones puede ser investigada y
        se pueden tomar las acciones legales necesarias, incluyendo más no
        limitándose, acciones civiles, penales y cautelares. En este acto, el
        Usuario manifiesta su conformidad para que OCESA pueda restringir su
        acceso a la App, cancelar su participación en trivias o promociones,
        eliminar cualquier contenido no autorizado del Usuario o ejercer
        cualquier otro recurso disponible si OCESA tiene elementos o indicios de
        que (i) su conducta o la conducta en común con cualquier Tercero
        interfiera con la App, (ii) el contenido del Usuario sea inconsistente
        con los Términos establecidos en esta página o con la Legislación.
        {'\n'}
        {'\n'}
        El Usuario está de acuerdo en que el uso ilegal de la App puede causar
        daños y perjuicios a OCESA, ocasionar entre otros hechos el impedimento
        de mantener una buena relación con los clientes, propiciar la pérdida de
        ventas y el aumento de los gastos involucrados en combatir el Uso, por
        lo que OCESA se reserva el derecho de ejercer cualquier acción legal en
        contra de quien le haya ocasionado dichos perjuicios.
        {'\n'}
        {'\n'}
        CLÁUSULA DE EXENCIÓN DE RESPONSABILIDADES
        {'\n'}
        {'\n'}
        OCESA no se obliga a que la App esté libre de errores, que no tendrá
        interrupciones, o que proporcione resultados específicos por su uso o
        por cualquier contenido, búsqueda o enlace en la App, y sus contenidos
        son mostrados tal cual y según su disponibilidad. OCESA no será
        responsable por ningún daño de cualquier tipo que surja del uso de la
        App, incluyendo sin limitación, daños directos, indirectos,
        incidentales, punitivos y consecuenciales.
        {'\n'}
        {'\n'}
        El Usuario acepta y reconoce que OCESA no será responsable por:
        {'\n'}
      </Text>

      <Layout>
        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              Problemas técnicos y daños y perjuicios producto de los sistemas
              de comunicación y transmisión de datos, así como por los virus,
              malware, errores, desactivadores o cualquier otro material
              contaminante o con funciones destructivas en la información o
              programas disponibles en o a través de la App
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              De los daños y perjuicios ocasionados por la naturaleza que
              imposibiliten de forma parcial o total el servicio de la App
              ofrecido al Usuario, por lo que no adquiere ninguna obligación por
              los eventos o perjuicios ocasionados por estos acontecimientos
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              De la información proporcionada por el Usuario a través de los
              formularios de registro
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              De verificar la identidad del Usuario de la App
            </Text>
          </Layout>
        </Layout>

        <Layout style={rowStyle}>
          <Layout style={{ width: 10 }}>
            <Text category="c1">{'\u2022'}</Text>
          </Layout>

          <Layout style={{ flex: 1 }}>
            <Text category="c1" style={{ textAlign: 'justify' }}>
              De la cancelación, suspensión, posposición, variantes de horarios
              fechas y en general de cualquier modificación de los espectáculos
              públicos publicados en la App (conciertos, obras teatrales,
              actividades deportivas y cualquier otro evento análogo considerado
              como espectáculo público
            </Text>
          </Layout>
        </Layout>
      </Layout>

      <Text category="c1" style={{ textAlign: 'justify' }}>
        El USUARIO está de acuerdo que el uso de la App es bajo su propio riesgo
        y que los servicios que se prestan y ofrecen pueden no mantenerse
        siempre ininterrumpidos, en tiempo, seguros o libres de errores.
        {'\n'}
        {'\n'}
        COMUNICACIONES Y NOTIFICACIONES
        {'\n'}
        {'\n'}
        El Usuario acepta y reconoce que OCESA podrá usar para documentar la
        relación que se derive del uso de la App, medios electrónicos para
        comunicarse y/o llevar a cabo notificaciones, ajustándose ambas partes a
        lo dispuesto en materia de Mensajes de Datos a lo que señala el Código
        de Comercio, para lo cual OCESA determina como su cuenta de correo
        electrónico para estos efectos la siguiente: contactoocesa@cie.com.mx;
        por su parte, el Usuario determina como su cuenta de correo electrónico
        para estos efectos, aquella a través de la cual efectuó su registro en
        la App.
        {'\n'}
        {'\n'}A estos efectos, el Usuario manifiesta que todos los datos que ha
        facilitado son ciertos y correctos, y no podrá realizar cambios
        relativos a los datos de notificación durante el uso de la App.
        {'\n'}
        {'\n'}
        CONFLICTO E INDEMNIZACIÓN
        {'\n'}
        {'\n'}
        En caso de conflicto, el mismo será regido por las leyes y la
        jurisdicción de la Ciudad de México, renunciando en este acto a
        cualquier otra jurisdicción que pudiere corresponderle de conformidad a
        su domicilio presente o futuro.
        {'\n'}
        {'\n'}
        El Usuario acepta liberar a OCESA y sus filiales, y a cada uno de los
        funcionarios, directores, gerentes, agentes, empleados y contratistas de
        cualquier responsabilidad de pérdida, obligación, reclamo o demanda,
        incluyendo los honorarios razonables de abogados, realizados por un
        tercero, debido a, o que surjan del uso de la App.
        {'\n'}
        {'\n'}
        TERRITORIALIDAD
        {'\n'}
        {'\n'}
        Al acceder y/o registrarse en esta App, usted estará aceptando tanto lo
        descrito en estos términos y condiciones como el que usted se somete a
        la jurisdicción de las leyes mexicanas; incluyendo aquella relativa a la
        de protección de datos personales; por lo que todos los asuntos
        relacionados con el servicio proporcionado, el tratamiento de su
        información y datos personales, serán atendidos con base en estas y, por
        lo tanto, las leyes correspondientes a la jurisdicción del país en el
        que usted resida, aun cuando en dicha jurisdicción se les haya dado el
        carácter de extraterritoriales, no serán aplicables.
        {'\n'}
        {'\n'}
        CONTACTO
        {'\n'}
        {'\n'}
        La siguiente dirección de correo electrónico queda a disposición del
        Usuario para cualquier duda o comentario:{' '}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() => openComposer({ to: 'contactoocesa@cie.com.mx' })}>
          contactoocesa@cie.com.mx
        </Text>
        {'\n'}
        {'\n'}
        Consulta nuestro{' '}
        <Text
          status="info"
          category="c1"
          style={textLinkStyle}
          onPress={() =>
            navigation.navigate('NoticePrivacy', {
              label: 'Aviso de privacidad',
            })
          }>
          Aviso de Privacidad
        </Text>{' '}
        en la sección Configuración que se encuentra dentro de la App.
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

export default TermsConditionsText;
