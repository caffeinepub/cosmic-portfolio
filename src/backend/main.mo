import Array "mo:core/Array";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  var messages = Array.empty<ContactMessage>();

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = { name; email; message };
    messages := messages.concat(Array.singleton(newMessage));
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    messages;
  };

  public query ({ caller }) func getStatus() : async Text {
    "Portfolio backend is running 🚀";
  };
};
