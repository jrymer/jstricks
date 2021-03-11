
# Docker
### Hot reloading vs rebuilding
If you make changes to the service code, e.g. add more logging or a `print('hello world')` statements, the service will restart/reinitialize, and tailing the logs with `docker-compose logs -f plexus` would show you that. Rebuilding all of it will do the same thing but costs more time.
Flask apps built on pymera/flask-pymera will hot restart the app if you change any files. If you change a setting or anything docker related you’ll need to rebuild.

### Commands
* `docker-compose exec <container id> bash` ssh into a container


# Additional notes
* `Object.keys()` returns `string[]` if we want the keys to be of a specific type we need to do `Object.keys() as (keyof Type)[]`
* If the error `Addess is in use` pops up
	> `sudo lsof -i :port`
	
	> `sudo kill -9 PID`
* We upgraded to babel 7, babel 7 just compiles even if TS fails, then later we switched our linting to be eslint from TS lint and upgraded our TS to 3.8. And somewhere along that trail typing stopped getting enforced so i’d see them if i opened a file that had a typing problem but the build would be fine so we’d ignore. So i added a plugin that i added to continuum cause they had the same problem. The plugin runs typescript compiler in a different thread.
webpack is:
  > running babel
  
  > running this plugin that runs tsc
  > 
