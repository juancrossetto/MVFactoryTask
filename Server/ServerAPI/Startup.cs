using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using ServerAPI.Models;

namespace ServerAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options =>
                {
                    var resolver = options.SerializerSettings.ContractResolver;
                    if (resolver != null)
                        (resolver as DefaultContractResolver).NamingStrategy = null;
                }); ;

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            //Instance my DbContext
            services.AddDbContext<DataBaseContext>(options => 
                                                   options.UseSqlServer(Configuration.GetConnectionString("MainConnection")));

            //Add CORS configuration to let cross origin calls
            services.AddCors();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //More CORS configuration, to allow any method (post, get, delete, put, etc).
            string angularUrl = Configuration.GetSection("AppSettings").GetValue<string>("AngularUrl");
            app.UseCors(options => options.WithOrigins(angularUrl)
                                            .AllowAnyMethod()
                                            .AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseMvc();

            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });
        }
    }
}
