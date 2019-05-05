class Command {
  constructor(options) {
    this.name = options.name;
    this.aliases = options.aliases || [];
    this.usage = options.usage || 'None';
    this.description = options.description || 'No description provided.';
    this.devOnly = options.devOnly || false;
  }
}

module.exports = Command;
