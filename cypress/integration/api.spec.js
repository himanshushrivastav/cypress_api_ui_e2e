const email = "himanshu1123@1101two.in";
var id;

describe("API call Validation task", () => {
  var value;
  const responce = {
    method: "POST",
    url: "https://thinking-tester-contact-list.herokuapp.com/users",
    body: {
      firstName: "him",
      lastName: "sir",
      email: email,
      password: "123454554",
    },
  };
  it("1. POST CALL", () => {
    cy.request(responce).then((res) => {
      cy.log(res.body);
      expect(res.status).to.eq(201);
      expect(res.body.user).to.have.property("email", email);
      expect(res.body.user).to.not.have.property("email", undefined); //similar way we can validate all the values are not undefined
      value = res.body.token;
    });
  });

  it("2. Fetch User", () => {
    cy.request({
      method: "GET",
      url: "https://thinking-tester-contact-list.herokuapp.com/users/me",
      headers: {
        Authorization: "Bearer " + value,
      },
    }).then((res2) => {
      expect(res2.status).to.eq(200);
      expect(res2.body).to.have.property("email", email);
      expect(res2.body).to.not.have.property("email", undefined);
    });
  });

  it("3. Add Contact", () => {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc2OGI4Y2NlZDBlZTAwMTVhNjA3MmEiLCJpYXQiOjE2MzUxNTg5MjR9.v12t2Ox9RD6q94L4_pxKc9ev4PzCL57a9_k6STdsC4U";
    cy.request({
      method: "POST",
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        firstName: "him",
        lastName: "sri",
        birthdate: "1996-01-01",
        email: "him@12314.in",
        phone: "1234567890",
        street1: "C-4",
        street2: "YVR",
        city: "New Delhi",
        stateProvince: "DELHI",
        postalCode: "110053",
        country: "INDIA",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("email", "him@12314.in");
      expect(res.body).to.not.have.property("email", undefined);
      id = res.body._id;
    });
  });

  it("4. Update Contact", () => {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc2OGI4Y2NlZDBlZTAwMTVhNjA3MmEiLCJpYXQiOjE2MzUxNTg5MjR9.v12t2Ox9RD6q94L4_pxKc9ev4PzCL57a9_k6STdsC4U";
    cy.request({
      method: "PUT",
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts/" + id,
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        firstName: "him",
        lastName: "sri",
        birthdate: "1996-01-01",
        email: "him@12314.in",
        phone: "1234567890",
        street1: "C-4",
        street2: "YVR",
        city: "New Delhi",
        stateProvince: "DELHI",
        postalCode: "110053",
        country: "INDIA",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("email", "him@12314.in");
      expect(res.body).to.not.have.property("email", undefined);
      id = res.body._id;
    });
  });

  it("6. Get Contact", () => {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc2OGI4Y2NlZDBlZTAwMTVhNjA3MmEiLCJpYXQiOjE2MzUxNTg5MjR9.v12t2Ox9RD6q94L4_pxKc9ev4PzCL57a9_k6STdsC4U";

    cy.request({
      method: "GET",
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts/" + id,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res2) => {
      expect(res2.status).to.eq(200);
      expect(res2.body).to.have.property("email", "him@12314.in");
      expect(res2.body).to.not.have.property("email", undefined);
    });
  });
  it.only("5. Delete Contact", () => {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc2OGI4Y2NlZDBlZTAwMTVhNjA3MmEiLCJpYXQiOjE2MzUxNTg5MjR9.v12t2Ox9RD6q94L4_pxKc9ev4PzCL57a9_k6STdsC4U";
    cy.request({
      method: "POST",
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        firstName: "him",
        lastName: "sri",
        birthdate: "1996-01-01",
        email: "him@12314.in",
        phone: "1234567890",
        street1: "C-4",
        street2: "YVR",
        city: "New Delhi",
        stateProvince: "DELHI",
        postalCode: "110053",
        country: "INDIA",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      cy.log("deleted ID-> " + res.body._id)
      cy.request({
        method: "DELETE",
        url:
          "https://thinking-tester-contact-list.herokuapp.com/contacts/" +
          res.body._id,
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res2) => {
        expect(res2.status).to.eq(200);
      });
    });    
  });
});
