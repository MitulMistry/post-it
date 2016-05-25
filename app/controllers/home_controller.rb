class HomeController < ApplicationController
  def index
    @note = Note.new
    @tag = Tag.new
  end
end
