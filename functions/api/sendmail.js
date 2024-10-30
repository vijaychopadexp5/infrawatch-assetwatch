const dkimdomain = "loshe.in";

export async function onRequestPost(ctx) {
  try {
    let res = await handleRequest(ctx);

    return new Response(
      `Thank you for submitting your enquiry. A member of the team will be in touch shortly. ${res}`,
      {
        status: 201,
      }
    );
  } catch (e) {
    return new Response(`${e.message}\n${e.stack}`, { status: 500 });
  }
}

async function handleRequest({ request, env }) {
  const data = await request.formData();

  const name = data.get("name");
  const email = data.get("email");
  const query = data.get("query_type");
  const contactNumber = data.get("contact_number");
  const message = data.get("message");

  const to = [{ name: "LoShe", email: "contact@loshe.in" }];
  const from = { name: "LoShe LP Contact form", email: "no-reply@loshe.in" };
  const subject = "New Form Submission from Landing Page";
  const body = mailTemplate`
Name: ${name}

Email: ${email}

Query Type: ${query}

Phone Number: ${contactNumber}

Message:

${message}
  `;

  const dkimKey = env.DKIM_PRIVATE_KEY || "";

  return await sendMail(to, from, subject, body, dkimKey);
}

async function sendMail(to, from, subject, body, dkimKey) {
  if (!Array.isArray(to)) {
    to = [to];
  }

  const resp = await fetch(
    new Request("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: to,
            dkim_domain: dkimdomain,
            dkim_selector: "mailchannels",
            dkim_private_key: dkimKey,
          },
        ],
        subject,
        from,
        content: [
          {
            type: "text/plain",
            value: body,
          },
        ],
      }),
    })
  );
  const respText = await resp.text();
  return resp.status + " " + resp.statusText + " " + respText;
}

function mailTemplate(templateArr, ...args) {
  return templateArr
    .reduce((acc, tempaltePart, index) => {
      acc.push(tempaltePart);
      acc.push(args[index]);
      return acc;
    }, [])
    .join("");
}