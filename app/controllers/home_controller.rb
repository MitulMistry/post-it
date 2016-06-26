class HomeController < ApplicationController
  def index
    @note = Note.new #for form_for
    @tag = Tag.new #for form_for
  end
end
